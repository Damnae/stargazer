<script setup lang="ts">
  import { computed, ref, watch, } from 'vue';
  import { StatusConfig, getStatuses } from '@/sources/status';
  import StatusItem from './StatusItem.vue';

  const props = defineProps<{fromCommitId:string, commitId:string}>()
  
  const statusesFrom = ref<StatusConfig>(await getStatuses(props.fromCommitId))
  const statuses = ref<StatusConfig>(await getStatuses(props.commitId))
  watch(props, async () => 
  {
    const from = await getStatuses(props.fromCommitId)
    const to = await getStatuses(props.commitId)
    statusesFrom.value = from
    statuses.value = to
  })

  const addedStatuses = computed(() => Object.values(statuses.value)
    .filter(v => statusesFrom.value[v.StatusID] == undefined)
    .sort((a, b) => a.StatusName.Text > b.StatusName.Text ? 1 : -1))

  const removedStatuses = computed(() => Object.values(statusesFrom.value)
    .filter(v => statuses.value[v.StatusID] == undefined)
    .sort((a, b) => a.StatusName.Text > b.StatusName.Text ? 1 : -1))

</script>

<template>

  <h2>Statuses</h2>

  <h3>{{ addedStatuses.length }} Added</h3>
  <template v-for="status in addedStatuses">
    <StatusItem :status="status" :isPrevious="false" />
  </template>

  <h3>{{ removedStatuses.length }} Removed</h3>
  <template v-for="status in removedStatuses">
    <StatusItem :status="status" :isPrevious="true" />
  </template>

</template>

<style scoped>
</style>