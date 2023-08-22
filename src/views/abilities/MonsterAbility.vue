<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getMonster, Monster, } from '../../scripts/sources/monster.ts';
  import { getCharacterByMonster, Character } from '../../scripts/sources/character';
  import { getMonsterSkill, MonsterSkill, } from '../../scripts/sources/monsterskill';
  import Ability from './Ability.vue';

  const props = defineProps<{commitId:string, objectId:number, skillId?:number, abilityId:string}>()

  const monster = ref<Monster>(await getMonster(props.commitId, props.objectId))
  const monsterSkill = ref<MonsterSkill>()
  const character = ref<Character>()

  watchEffect(async () => 
  {
    monster.value = await getMonster(props.commitId, props.objectId)
    if (props.skillId)
      monsterSkill.value = await getMonsterSkill(props.commitId, props.skillId)
    character.value = await getCharacterByMonster(props.commitId, monster.value)
  })
</script>

<template>
  <main class="panel">
    <Ability :abilityId="abilityId" />
  </main>
</template>

<style scoped>
</style>