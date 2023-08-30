<script setup lang="ts">
  import { ref, watch, provide,} from 'vue'
  import { getMonster, } from '@/scripts/sources/monster';
  import { getMonsterSkillsByIds, } from '@/scripts/sources/monsterskill';
  import { getCharacterByMonster, } from '@/scripts/sources/character';
  import { getAbilityContext, AbilityContext, AbilityContextType, } from '@/scripts/sources/ability';
  import { GamecoreContext, } from '@/scripts/sources/gamecore';

  const props = defineProps<{commitId:string, objectId:number}>()
  
  const gamecoreContext = ref<GamecoreContext>(await getGamecoreContext())
  const abilityContext = ref<AbilityContext>(await getAbilityContext(props.commitId, AbilityContextType.Monster))

  watch(props, async () => 
  {
    gamecoreContext.value = await getGamecoreContext()
    abilityContext.value = await getAbilityContext(props.commitId, AbilityContextType.Monster)
  })

  async function getGamecoreContext()
  {
    const monster = await getMonster(props.commitId, props.objectId)
    const monsterSkills = await getMonsterSkillsByIds(props.commitId, monster.SkillList)
    const character = await getCharacterByMonster(props.commitId, monster)

    const context:GamecoreContext = 
    {
      Params: {},
      DynamicValues: character.DynamicValues,
      AbilityDynamicValues: {},
    }

    for (const skill of monsterSkills)
      if (skill.SkillTriggerKey)
        context.Params[skill.SkillTriggerKey] = skill.ParamList

    return context
  }
  
  provide('gamecoreContext', gamecoreContext)
  provide('abilityContext', abilityContext)
  provide('createAbilityRoute', (abilityId:string) : object => { return { name:'monsterAbility', params:{ commitId: props.commitId, objectId: props.objectId, abilityId: abilityId, } }})
  provide('createModifierRoute', (modifierId:string) : object => { return { name:'monsterModifier', params:{ commitId: props.commitId, objectId: props.objectId, modifierId: modifierId, } }})
</script>

<template> 
  <slot></slot>
</template>

<style scoped>
</style>