<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getMonster, Monster, } from '../../scripts/sources/monster.ts';
  import { getCharacterByMonster, Character } from '../../scripts/sources/character';
  import { getMonsterSkillsByIds, MonsterSkill, } from '../../scripts/sources/monsterskill';
  import CharacterSkillAbilitiesNav from './CharacterSkillAbilitiesNav.vue';
  import CharacterOtherAbilitiesNav from './CharacterOtherAbilitiesNav.vue';

  const props = defineProps<{commitId:string, monsterId:number}>()

  const monster = ref<Monster>(await getMonster(props.commitId, props.monsterId))
  const monsterSkills = ref<MonsterSkill[]>([])
  const character = ref<Character>()

  watchEffect(async () => 
  {
    monster.value = await getMonster(props.commitId, props.monsterId)
    monsterSkills.value = await getMonsterSkillsByIds(props.commitId, monster.value.SkillList)
    character.value = await getCharacterByMonster(props.commitId, monster.value)
  })
</script>

<template>
  <h1>{{ monster.MonsterName.Text }}</h1>
  <span v-if="!character" class="minor">(Missing character data)</span>
  <ul class="navtree">
    <li>
      <div>Skills</div>
      <ul>
        <template v-for="skill in monsterSkills" :key="skill.SkillID">
          <li>
            <div :title="skill.SkillTriggerKey">{{ skill.SkillTag.Text }} {{ skill.SkillTypeDesc.Text }} <span class="minor" :title="skill.SkillName.Text">{{ skill.SkillName.Text }}</span></div>
            <CharacterSkillAbilitiesNav v-if="character" :skillTriggerKey="skill.SkillTriggerKey" :character="character" />
          </li>
        </template>
      </ul>
    </li>
    <li v-if="character">
      <CharacterOtherAbilitiesNav :character="character" />
    </li>
  </ul>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>