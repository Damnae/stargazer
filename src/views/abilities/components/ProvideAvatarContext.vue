<script setup lang="ts">
  import { ref, watch, provide, } from 'vue'
  import { getAvatar, } from '@/sources/avatar';
  import { getAvatarSkillsByIds, } from '@/sources/avatarskill';
  import { getCharacterByAvatar, } from '@/sources/character';
  import { getTaskContext, TaskContext, TaskContextType, } from '@/sources/ability';
  import { ExpressionContext, } from '@/sources/gamecore';

  import { buildAbilityHashValues, } from './helper'

  const props = defineProps<{commitId:string, objectId:number}>()
  
  const expressionContext = ref<ExpressionContext>(await getExpressionContext())
  const taskContext = ref<TaskContext>(await getTaskContext(props.commitId, TaskContextType.Avatar))

  watch(props, async () => 
  {
    expressionContext.value = await getExpressionContext()
    taskContext.value = await getTaskContext(props.commitId, TaskContextType.Avatar)
  })

  async function getExpressionContext()
  {
    const avatar = await getAvatar(props.commitId, props.objectId)
    const avatarSkills = await getAvatarSkillsByIds(props.commitId, avatar.SkillList)
    const character = await getCharacterByAvatar(props.commitId, avatar)
    
    const context:ExpressionContext = 
    {
      Params: {},
      AbilityHashValues: buildAbilityHashValues(character, avatarSkills),
      DynamicValues: character?.DynamicValues,
      AbilityDynamicValues: {},
    }

    // SkillMaze, Skill* and PassiveSKill*
    for (const skill of avatarSkills)
      if (skill.SkillTriggerKey)
        context.Params[skill.SkillTriggerKey] = skill.ParamList

    // Eidolons
    for (const [index, eidolon] of avatar.Eidolons.entries())
      context.Params[`Rank${(index + 1).toString().padStart(2, '0')}`] = eidolon.Param

    // Ascension Traces (This relies on them being in the correct order)
    for (const [index, trace] of avatar.Traces.filter(t => t.PointType === 3).entries())
      context.Params[`PointB${index + 1}`] = trace.ParamList

    return context
  }

  provide('expressionContext', expressionContext)
  provide('taskContext', taskContext)
  provide('createAbilityRoute', (abilityId:string) : object => { return { name:'avatarAbility', params:{ commitId: props.commitId, objectId: props.objectId, abilityId: abilityId, } }})
  provide('createModifierRoute', (modifierId:string) : object => { return { name:'avatarModifier', params:{ commitId: props.commitId, objectId: props.objectId, modifierId: modifierId, } }})
</script>

<template> 
  <slot></slot>
</template>

<style scoped>
</style>