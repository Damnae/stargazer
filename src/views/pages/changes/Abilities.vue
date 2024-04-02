<script setup lang="ts">
  import { computed, ref, watch, } from 'vue';
  import { TaskContext, TaskContextType, getTaskContext } from '@/sources/ability';
  import AbilityItem from './AbilityItem.vue';

  const props = defineProps<{fromCommitId:string, commitId:string, contextType:TaskContextType}>()

  const taskContextFrom = ref<TaskContext>(await getTaskContext(props.fromCommitId, props.contextType))
  const taskContext = ref<TaskContext>(await getTaskContext(props.commitId, props.contextType))
  watch(props, async () => 
  {
    const from = await getTaskContext(props.fromCommitId, props.contextType)
    const to = await getTaskContext(props.commitId, props.contextType)
    taskContextFrom.value = from
    taskContext.value = to
  })

  const addedAbilities = computed(() => Object.values(taskContext.value.Abilities)
    .filter(v => taskContextFrom.value.Abilities[v.Name] == undefined)
    .sort((a, b) => a.Name > b.Name ? 1 : -1))

  const removedAbilities = computed(() => Object.values(taskContextFrom.value.Abilities)
    .filter(v => taskContext.value.Abilities[v.Name] == undefined)
    .sort((a, b) => a.Name > b.Name ? 1 : -1))

</script>

<template>

  <h2>Abilities</h2>

  <h3>{{ addedAbilities.length }} Added</h3>
  <template v-for="ability in addedAbilities">
    <AbilityItem :ability="ability" :isPrevious="false" />
  </template>

  <h3>{{ removedAbilities.length }} Removed</h3>
  <template v-for="ability in removedAbilities">
    <AbilityItem :ability="ability" :isPrevious="true" />
  </template>

</template>

<style scoped>
</style>