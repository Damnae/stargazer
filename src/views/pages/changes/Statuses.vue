<script setup lang="ts">
  import { computed, ref, watch, } from 'vue';
  import { StatusConfig, getStatuses } from '@/sources/status';
  import StatusItem from './StatusItem.vue';
  import LoadingArea from '@/components/LoadingArea.vue';

  const props = defineProps<{fromCommitId:string, commitId:string}>()

  const loading = ref(true)
  const statusesFrom = ref<StatusConfig>({})
  const statuses = ref<StatusConfig>({})
  watch(props, async () => 
  {
    loading.value = true
    statusesFrom.value = await getStatuses(props.fromCommitId)
    statuses.value = await getStatuses(props.commitId)
    loading.value = false
  }, { immediate:true })

  const addedStatuses = computed(() => Object.values(statuses.value)
    .filter(v => statusesFrom.value[v.StatusID] == undefined)
    .sort((a, b) => a.StatusName.Text > b.StatusName.Text ? 1 : -1))

  const removedStatuses = computed(() => Object.values(statusesFrom.value)
    .filter(v => statuses.value[v.StatusID] == undefined)
    .sort((a, b) => a.StatusName.Text > b.StatusName.Text ? 1 : -1))

</script>

<template>

  <h2>Statuses</h2>

  <LoadingArea :loading="loading">
    <h3>{{ addedStatuses.length }} Added</h3>
    <template v-for="status in addedStatuses">
      <StatusItem :status="status" :isPrevious="false" />
    </template>

    <h3>{{ removedStatuses.length }} Removed</h3>
    <template v-for="status in removedStatuses">
      <StatusItem :status="status" :isPrevious="true" />
    </template>
  </LoadingArea>

</template>

<style scoped>
</style>