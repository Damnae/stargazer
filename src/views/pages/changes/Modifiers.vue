<script setup lang="ts">
  import { computed, ref, watch, } from 'vue';
  import { TaskContext, TaskContextType, getTaskContext } from '@/sources/ability';
  import ModifierItem from './ModifierItem.vue';

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

  const addedModifiers = computed(() => Object.values(taskContext.value.Modifiers)
    .filter(v => taskContextFrom.value.Modifiers[v.Name] == undefined)
    .sort((a, b) => a.Name > b.Name ? 1 : -1))

  const removedModifiers = computed(() => Object.values(taskContextFrom.value.Modifiers)
    .filter(v => taskContext.value.Modifiers[v.Name] == undefined)
    .sort((a, b) => a.Name > b.Name ? 1 : -1))

</script>

<template>

  <h2>Modifiers</h2>

  <h3>{{ addedModifiers.length }} Added</h3>
  <template v-for="modifier in addedModifiers">
    <ModifierItem :modifier="modifier" />
  </template>

  <h3>{{ removedModifiers.length }} Removed</h3>
  <template v-for="modifier in removedModifiers">
    <ModifierItem :modifier="modifier" />
  </template>

</template>

<style scoped>
</style>