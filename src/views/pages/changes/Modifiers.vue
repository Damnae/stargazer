<script setup lang="ts">
  import { computed, ref, watch, } from 'vue';
  import { TaskContext, TaskContextType, getTaskContext } from '@/sources/ability';

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

  function createModifierRoute(modifierId:string) 
  { 
    return { name: 'modifier', params: { commitId: props.commitId, modifierId: modifierId, }}
  }
</script>

<template>

  <h2>
    <span class="minor">{{ Object.keys(taskContext.Modifiers).length - Object.keys(taskContextFrom.Modifiers).length }}</span>
    Modifiers
  </h2>
  <div class="block" v-for="addedModifier in addedModifiers">
    <RouterLink v-if="addedModifier.Name" :to="createModifierRoute(addedModifier.Name)">
      <em>{{ addedModifier.Name }}</em>
    </RouterLink>
    <template v-if="addedModifier.BehaviorFlagList">
      &nbsp;<span class="minor">
        {{ addedModifier.BehaviorFlagList.join(', ') }}
      </span>
    </template>
  </div>

</template>

<style scoped>
</style>