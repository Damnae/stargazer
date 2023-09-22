<script setup lang="ts">
  import { ref, watch, provide,} from 'vue'
  import { getMonster, } from '@/sources/monster';
  import { getMonsterSkillsByIds, } from '@/sources/monsterskill';
  import { getCharacterByMonster, } from '@/sources/character';
  import { getTaskContext, TaskContext, TaskContextType, } from '@/sources/ability';
  import { ExpressionContext, } from '@/sources/gamecore';
  import { buildAbilityHashValues } from './helper';

  const props = defineProps<{commitId:string, objectId:number}>()
  
  const expressionContext = ref<ExpressionContext>(await getExpressionContext())
  const taskContext = ref<TaskContext>(await getTaskContext(props.commitId, TaskContextType.Monster))

  watch(props, async () => 
  {
    expressionContext.value = await getExpressionContext()
    taskContext.value = await getTaskContext(props.commitId, TaskContextType.Monster)
  })

  async function getExpressionContext()
  {
    const monster = await getMonster(props.commitId, props.objectId)
    const monsterSkills = await getMonsterSkillsByIds(props.commitId, monster.SkillList)
    const character = await getCharacterByMonster(props.commitId, monster)

    const context:ExpressionContext = 
    {
      Params: {},
      AbilityHashValues: buildAbilityHashValues(character, monsterSkills),
      DynamicValues: character?.DynamicValues,
      AbilityDynamicValues: {},
    }

    for (const skill of monsterSkills)
      if (skill.SkillTriggerKey)
        context.Params[skill.SkillTriggerKey] = skill.ParamList

    return context
  }
  
  provide('expressionContext', expressionContext)
  provide('taskContext', taskContext)
  provide('createAbilityRoute', (abilityId:string) : object => { return { name:'monsterAbility', params:{ commitId: props.commitId, objectId: props.objectId, abilityId: abilityId, } }})
  provide('createModifierRoute', (modifierId:string) : object => { return { name:'monsterModifier', params:{ commitId: props.commitId, objectId: props.objectId, modifierId: modifierId, } }})
</script>

<template> 
  <slot></slot>
</template>

<style scoped>
</style>