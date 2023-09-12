<script setup lang="ts">
  import { ref, watch, provide, } from 'vue';
  import { ExpressionContext } from '@/sources/gamecore';
  import { getEquipment } from '@/sources/equipment';
  import { getTaskContext, TaskContext, TaskContextType, } from '@/sources/ability';

  const props = defineProps<{commitId:string, objectId:number}>()
  
  const expressionContext = ref<ExpressionContext>(await getExpressionContext())
  const taskContext = ref<TaskContext>(await getTaskContext(props.commitId, TaskContextType.Equipment))

  watch(props, async () => 
  {
    expressionContext.value = await getExpressionContext()
    taskContext.value = await getTaskContext(props.commitId, TaskContextType.Equipment)
  })

  async function getExpressionContext()
  {
    const equipment = await getEquipment(props.commitId, props.objectId)
    const context:ExpressionContext = 
    {
      Params: 
      {
        "": equipment.Skill.ParamList
      },
      AbilityHashValues: {},
      AbilityDynamicValues: {},
    }
    return context
  }

  provide('expressionContext', expressionContext)
  provide('taskContext', taskContext)
  provide('createAbilityRoute', (abilityId:string) : object => { return { name:'equipmentAbility', params:{ commitId: props.commitId, objectId: props.objectId, abilityId: abilityId, } }})
  provide('createModifierRoute', (modifierId:string) : object => { return { name:'equipmentModifier', params:{ commitId: props.commitId, objectId: props.objectId, modifierId: modifierId, } }})
</script>

<template> 
  <slot></slot>
</template>

<style scoped>
</style>