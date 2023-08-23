<script setup lang="ts">
  import { ref, watch, } from 'vue'
  import { getMonster, } from '../../scripts/sources/monster';
  import { getMonsterSkillsByIds, } from '../../scripts/sources/monsterskill';
  import { getCharacterByMonster, } from '../../scripts/sources/character';
  import { buildAbilityContext, AbilityContext, } from '../../scripts/sources/ability';
  import Ability from './Ability.vue';

  const props = defineProps<{commitId:string, objectId:number, abilityId:string}>()
  
  const abilityContext = ref<AbilityContext>(await getAbilityContext())
  watch(props, async () => abilityContext.value = await getAbilityContext())

  async function getAbilityContext()
  {
    const monster = await getMonster(props.commitId, props.objectId)
    const monsterSkills = await getMonsterSkillsByIds(props.commitId, monster.SkillList)
    const character = await getCharacterByMonster(props.commitId, monster)
    return buildAbilityContext(monster, monsterSkills, character)
  }
</script>

<template> 
  <main class="panel">
    <Ability :abilityId="abilityId" :context="abilityContext" />
  </main>
</template>

<style scoped>
</style>