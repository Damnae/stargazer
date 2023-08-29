<script setup lang="ts">
  import { ref, watch, provide, } from 'vue'
  import { getAvatar, } from '@/scripts/sources/avatar';
  import { getAvatarSkillsByIds, } from '@/scripts/sources/avatarskill';
  import { getCharacterByAvatar, } from '@/scripts/sources/character';
  import { getAbilityContext, AbilityContext, AbilityContextType, } from '@/scripts/sources/ability';
  import { GamecoreContext, } from '@/scripts/sources/gamecore';
  import Ability from './Ability.vue';

  const props = defineProps<{commitId:string, objectId:number, abilityId:string}>()
  
  const gamecoreContext = ref<GamecoreContext>(await getGamecoreContext())
  const abilityContext = ref<AbilityContext>(await getAbilityContext(props.commitId, AbilityContextType.Avatar))

  watch(props, async () => 
  {
    gamecoreContext.value = await getGamecoreContext()
    abilityContext.value = await getAbilityContext(props.commitId, AbilityContextType.Avatar)
  })

  async function getGamecoreContext()
  {
    const avatar = await getAvatar(props.commitId, props.objectId)
    const avatarSkills = await getAvatarSkillsByIds(props.commitId, avatar.SkillList)
    const character = await getCharacterByAvatar(props.commitId, avatar)
    
    const context:GamecoreContext = 
    {
      Params: {},
      DynamicValues: character.DynamicValues,
    }

    // SkillMaze
    // TODO

    // Skill* and PassiveSKill*
    for (const skill of avatarSkills)
      if (skill.SkillTriggerKey)
        context.Params[skill.SkillTriggerKey] = skill.ParamList

    // Eidolons
    for (const [index, eidolon] of avatar.Eidolons.entries())
      context.Params[`Rank0${index + 1}`] = eidolon.Param

    // Ascension Traces (This relies on them being in the correct order)
    for (const [index, trace] of avatar.Traces.filter(t => t.PointType === 3).entries())
      context.Params[`PointB${index + 1}`] = trace.ParamList

    return context
  }
  
  provide('gamecoreContext', gamecoreContext)
  provide('abilityContext', abilityContext)
  provide('createAbilityRoute', (abilityId:string) : object => { return { name:'avatarAbility', params:{ commitId: props.commitId, objectId: props.objectId, abilityId: abilityId, } }})
</script>

<template> 
  <main class="panel">
    <Ability :abilityId="abilityId" />
  </main>
</template>

<style scoped>
</style>