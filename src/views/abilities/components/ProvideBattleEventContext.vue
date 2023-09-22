<script setup lang="ts">
  import { ref, watch, provide,} from 'vue'
  import { getBattleEvent } from '@/sources/battleevent';
  import { getBattleEventSkillsByIds, } from '@/sources/battleeventskill';
  import { getCharacterByBattleEvent, } from '@/sources/character';
  import { getTaskContext, TaskContext, TaskContextType, } from '@/sources/ability';
  import { ExpressionContext, } from '@/sources/gamecore';
  import { buildAbilityHashValues } from './helper';

  const props = defineProps<{commitId:string, objectId:number}>()
  
  const expressionContext = ref<ExpressionContext>(await getExpressionContext())
  const taskContext = ref<TaskContext>(await getTaskContext(props.commitId, TaskContextType.BattleEvent))

  watch(props, async () => 
  {
    expressionContext.value = await getExpressionContext()
    taskContext.value = await getTaskContext(props.commitId, TaskContextType.BattleEvent)
  })

  async function getExpressionContext()
  {
    const battleEvent = await getBattleEvent(props.commitId, props.objectId)
    const battleEventSkills = battleEvent.Data ? await getBattleEventSkillsByIds(props.commitId, battleEvent.Data.SkillIDList) : []
    const character = await getCharacterByBattleEvent(props.commitId, battleEvent)

    const context:ExpressionContext = 
    {
      Params:       
      {
        "#BattleEvent": battleEvent.ParamList
      },
      AbilityHashValues: buildAbilityHashValues(character, battleEventSkills),
      DynamicValues: character?.DynamicValues,
      AbilityDynamicValues: {},
    }

    for (const skill of battleEventSkills)
      if (skill.SkillTriggerKey)
        context.Params[skill.SkillTriggerKey] = skill.ParamList

    return context
  }
  
  provide('expressionContext', expressionContext)
  provide('taskContext', taskContext)
  provide('createAbilityRoute', (abilityId:string) : object => { return { name:'battleEventAbility', params:{ commitId: props.commitId, objectId: props.objectId, abilityId: abilityId, } }})
  provide('createModifierRoute', (modifierId:string) : object => { return { name:'battleEventModifier', params:{ commitId: props.commitId, objectId: props.objectId, modifierId: modifierId, } }})
</script>

<template> 
  <slot></slot>
</template>

<style scoped>
</style>