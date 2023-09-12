<script setup lang="ts">
  import { ref, watch, provide, } from 'vue';
  import { ExpressionContext } from '@/sources/gamecore';
  import { getRelicSet } from '@/sources/relicset';
  import { getTaskContext, TaskContext, TaskContextType, } from '@/sources/ability';

  const props = defineProps<{commitId:string, objectId:number}>()
  
  const expressionContext = ref<ExpressionContext>(await getExpressionContext())
  const taskContext = ref<TaskContext>(await getTaskContext(props.commitId, TaskContextType.RelicSet))
  
  watch(props, async () => 
  {
    expressionContext.value = await getExpressionContext()
    taskContext.value = await getTaskContext(props.commitId, TaskContextType.RelicSet)
  })

  async function getExpressionContext()
  {
    const relicSet = await getRelicSet(props.commitId, props.objectId)
    const context:ExpressionContext = 
    {
      Params: {},
      AbilityHashValues: {},
      AbilityDynamicValues: {},
    }
    
    for (const skill of Object.values(relicSet.Skills))
      context.Params[`${skill.SetID}_${skill.RequireNum}`] = skill.AbilityParamList

    return context
  }
  
  provide('expressionContext', expressionContext)
  provide('taskContext', taskContext)
  provide('createAbilityRoute', (abilityId:string) : object => { return { name:'relicsetAbility', params:{ commitId: props.commitId, objectId: props.objectId, abilityId: abilityId, } }})
  provide('createModifierRoute', (modifierId:string) : object => { return { name:'relicsetModifier', params:{ commitId: props.commitId, objectId: props.objectId, modifierId: modifierId, } }})
</script>

<template> 
  <slot></slot>
</template>

<style scoped>
</style>