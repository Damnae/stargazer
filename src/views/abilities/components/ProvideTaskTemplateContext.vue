<script setup lang="ts">
  import { ref, watch, provide, } from 'vue';
  import { ExpressionContext } from '@/sources/gamecore';
  import { getTaskContext, TaskContext, TaskContextType, } from '@/sources/ability';

  const props = defineProps<{commitId:string, abilityRouteName?:string, modifierRouteName?:string}>()
  
  const expressionContext = ref<ExpressionContext>(await getExpressionContext())
  const taskContext = ref<TaskContext>(await getTaskContext(props.commitId, TaskContextType.TaskTemplate))

  watch(props, async () => 
  {
    expressionContext.value = await getExpressionContext()
    taskContext.value = await getTaskContext(props.commitId, TaskContextType.TaskTemplate)
  })

  async function getExpressionContext()
  {
    const context:ExpressionContext = 
    {
      Params: {},
      AbilityHashValues: {},
      AbilityDynamicValues: {},
    }
    return context
  }

  provide('expressionContext', expressionContext)
  provide('taskContext', taskContext)
  provide('createAbilityRoute', (abilityId:string) : object => { return { name: props.abilityRouteName ?? 'ability', params:{ commitId: props.commitId, abilityId: abilityId, } }})
  provide('createModifierRoute', (modifierId:string) : object => { return { name: props.modifierRouteName ?? 'modifier', params:{ commitId: props.commitId, modifierId: modifierId, } }})
</script>

<template>
  <slot></slot>
</template>

<style scoped>
</style>