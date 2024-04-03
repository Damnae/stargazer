<script setup lang="ts">
  import { computed, ref, watch, } from 'vue';
  import { TaskContext, TaskContextType, getTaskContext } from '@/sources/ability';
  import AbilityItem from './AbilityItem.vue';
  import LoadingArea from '@/components/LoadingArea.vue';

  const props = defineProps<{fromCommitId:string, commitId:string, contextType:TaskContextType}>()

  const loading = ref(true)
  const taskContextFrom = ref<TaskContext>(await getTaskContext(props.fromCommitId, TaskContextType.Empty))
  const taskContext = ref<TaskContext>(await getTaskContext(props.commitId, TaskContextType.Empty))
  watch(props, async () => 
  {
    loading.value = true
    taskContextFrom.value = await getTaskContext(props.fromCommitId, props.contextType)
    taskContext.value = await getTaskContext(props.commitId, props.contextType)
    loading.value = false
  }, { immediate:true })

  const addedAbilities = computed(() => Object.values(taskContext.value.Abilities)
    .filter(v => taskContextFrom.value.Abilities[v.Name] == undefined)
    .sort((a, b) => a.Name > b.Name ? 1 : -1))

  const removedAbilities = computed(() => Object.values(taskContextFrom.value.Abilities)
    .filter(v => taskContext.value.Abilities[v.Name] == undefined)
    .sort((a, b) => a.Name > b.Name ? 1 : -1))

</script>

<template>

  <h2>Abilities</h2>

  <LoadingArea :loading="loading">
    <h3>{{ addedAbilities.length }} Added</h3>
    <template v-for="ability in addedAbilities">
      <AbilityItem :ability="ability" :isPrevious="false" />
    </template>

    <h3>{{ removedAbilities.length }} Removed</h3>
    <template v-for="ability in removedAbilities">
      <AbilityItem :ability="ability" :isPrevious="true" />
    </template>
  </LoadingArea>

</template>

<style scoped>
</style>