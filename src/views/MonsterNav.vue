<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getMonster, Monster, } from '../scripts/sources/monster.ts';
  import { getCharacterByMonster, Character } from '../scripts/sources/character';
  import { MonsterSkill, getMonsterSkillsByIds, } from '../scripts/sources/monsterskill';
  import CharacterSkillNav from './CharacterSkillNav.vue';

  const props = defineProps<{commitId:string, monsterId:number}>()

  const monster = ref<Monster>(await getMonster(props.commitId, props.monsterId))
  const monsterSkills = ref<MonsterSkill[]>([])
  const character = ref<Character>(await getCharacterByMonster(props.commitId, monster.value))

  watchEffect(async () => 
  {
    monster.value = await getMonster(props.commitId, props.monsterId)
    monsterSkills.value = await getMonsterSkillsByIds(props.commitId, monster.value.SkillList)
    character.value = await getCharacterByMonster(props.commitId, monster.value)
  })
</script>

<template>
  <h1>{{ monster.MonsterName.Text }}</h1>
  <ul class="navtree">
    <li>
      <div>Skills</div>
      <ul>
        <template v-for="skill in monsterSkills">
          <li>
            <div :title="skill.SkillTriggerKey">{{ skill.SkillTag.Text }} {{ skill.SkillTypeDesc.Text }} <span class="minor" :title="skill.SkillName.Text">{{ skill.SkillName.Text }}</span></div>
            <CharacterSkillNav :skillTriggerKey="skill.SkillTriggerKey" :character="character" />
          </li>
        </template>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>
../scripts/avatarsource.ts