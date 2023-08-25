<script setup lang="ts">
  import { ref, watch, } from 'vue'
  import { getMonster, } from '../../scripts/sources/monster';
  import { getMonsterSkillsByIds, } from '../../scripts/sources/monsterskill';
  import { getCharacterByMonster, } from '../../scripts/sources/character';
  import { getAbilityContext, AbilityContext, AbilityContextType, } from '../../scripts/sources/ability';
  import { buildAbilityContext, GamecoreContext, } from '../../scripts/sources/gamecore';
  import Ability from './Ability.vue';

  const props = defineProps<{commitId:string, objectId:number, abilityId:string}>()
  
  const gamecoreContext = ref<GamecoreContext>(await getGamecoreContext())
  watch(props, async () => gamecoreContext.value = await getGamecoreContext())

  async function getGamecoreContext()
  {
    const monster = await getMonster(props.commitId, props.objectId)
    const monsterSkills = await getMonsterSkillsByIds(props.commitId, monster.SkillList)
    const character = await getCharacterByMonster(props.commitId, monster)
    return buildAbilityContext(monster, monsterSkills, character)
  }

  const abilityContext = ref<AbilityContext>(await getAbilityContext(props.commitId, AbilityContextType.Monster))
  watch(props, async () => abilityContext.value = await getAbilityContext(props.commitId, AbilityContextType.Monster))
</script>

<template> 
  <main class="panel">
    <Ability :abilityId="abilityId" :context="gamecoreContext" />
  </main>
  <aside class="panel">
    <h1>Context</h1>
    <pre>{{ abilityContext }}</pre>
  </aside>
</template>

<style scoped>
</style>