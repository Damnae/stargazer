<script setup lang="ts">
  import { computed, ref, watch, } from 'vue';
  import { TaskContext, TaskContextType, getTaskContext } from '@/sources/ability';
  import ModifierItem from './ModifierItem.vue';
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

  const addedModifiers = computed(() => Object.values(taskContext.value.Modifiers)
    .filter(v => taskContextFrom.value.Modifiers[v.Name] == undefined)
    .sort((a, b) => a.Name > b.Name ? 1 : -1))

  const removedModifiers = computed(() => Object.values(taskContextFrom.value.Modifiers)
    .filter(v => taskContext.value.Modifiers[v.Name] == undefined)
    .sort((a, b) => a.Name > b.Name ? 1 : -1))

</script>

<template>

  <h2>Modifiers</h2>

  <LoadingArea :loading="loading">
    <h3>{{ addedModifiers.length }} Added</h3>
    <template v-for="modifier in addedModifiers">
      <ModifierItem :modifier="modifier" :isPrevious="false" />
    </template>

    <h3>{{ removedModifiers.length }} Removed</h3>
    <template v-for="modifier in removedModifiers">
      <ModifierItem :modifier="modifier" :isPrevious="true" />
    </template>
  </LoadingArea>

</template>

<style scoped>
</style>