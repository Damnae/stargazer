<script setup lang="ts">
  import { computed, ref, watch, } from 'vue';
  import { StatusConfig, getStatuses } from '@/sources/status';

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

  function createModifierRoute(modifierId:string) 
  { 
    return { name: 'modifier', params: { commitId: props.commitId, modifierId: modifierId, }}
  }
</script>

<template>

  <h2>
    <span class="minor">{{ Object.keys(statuses).length - Object.keys(statusesFrom).length }}</span>
    Statuses
  </h2>
  <div class="block" v-for="addedStatus in addedStatuses">
    <template v-if="addedStatus.ModifierName">
      <RouterLink :to="createModifierRoute(addedStatus.ModifierName)">
        <em>{{ addedStatus.StatusName.Text }}</em>
      </RouterLink>
      &nbsp;<span class="minor">
        {{ addedStatus.ModifierName }}
      </span>
    </template>
    <template v-else>
      <em>{{ addedStatus.StatusName.Text }}</em>
    </template>
  </div>

</template>

<style scoped>
</style>