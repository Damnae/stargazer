<script setup lang="ts">
  import {  ref, watch, provide,} from 'vue'
  import { getMonster, } from '../../scripts/sources/monster';
  import { getMonsterSkillsByIds, } from '../../scripts/sources/monsterskill';
  import { getCharacterByMonster, } from '../../scripts/sources/character';
  import { getAbilityContext, AbilityContext, AbilityContextType, } from '../../scripts/sources/ability';
  import { buildAbilityContext, GamecoreContext, } from '../../scripts/sources/gamecore';
  import Ability from './Ability.vue';

  const props = defineProps<{commitId:string, objectId:number, abilityId:string}>()
  
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
    return buildAbilityContext(monster, monsterSkills, character)
  }

  provide('createAbilityRoute', (abilityId:string) : object => { return { name:'monsterAbility', params:{ commitId: props.commitId, objectId: props.objectId, abilityId: abilityId, } }})
</script>

<template> 
  <main class="panel">
    <Ability :abilityId="abilityId" :abilityContext="abilityContext" />
  </main>
</template>

<style scoped>
</style>