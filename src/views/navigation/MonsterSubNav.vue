<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getMonster, Monster, } from '../../scripts/sources/monster.ts';
  import { getMonsterSkillsByIds, MonsterSkill, } from '../../scripts/sources/monsterskill';
  import { getCharacterByMonster, Character } from '../../scripts/sources/character';
  import CharacterSkillAbilitiesNav from './CharacterSkillAbilitiesNav.vue';
  import CharacterOtherAbilitiesNav from './CharacterOtherAbilitiesNav.vue';

  const props = defineProps<{commitId:string, objectId:number}>()

  const monster = ref<Monster>(await getMonster(props.commitId, props.objectId))
  const monsterSkills = ref<MonsterSkill[]>([])
  const character = ref<Character>()

  watchEffect(async () => 
  {
    monster.value = await getMonster(props.commitId, props.objectId)
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
            <div>
              {{ skill.SkillTag.Text }} {{ skill.SkillTypeDesc.Text }} 
              <span class="minor">{{ skill.SkillTriggerKey }}</span> 
              <span class="minor" :title="skill.SkillName.Text">{{ skill.SkillName.Text }}</span>
            </div>
            <CharacterSkillAbilitiesNav v-if="character" :character="character" :skillTriggerKey="skill.SkillTriggerKey" v-slot="slotProps">
              <RouterLink :to="{ name:'monsterAbility', params:{ commitId: commitId, objectId: objectId, abilityId: slotProps.ability }}">
                {{ slotProps.ability }}
              </RouterLink>
            </CharacterSkillAbilitiesNav>
          </li>
        </template>
      </ul>
    </li>
    <li v-if="character">
      <div>Other Abilities</div>
      <CharacterOtherAbilitiesNav :character="character" v-slot="slotProps">
        <RouterLink :to="{ name:'monsterAbility', params:{ commitId: commitId, objectId: objectId, abilityId: slotProps.ability, }}">
          {{ slotProps.ability }}
        </RouterLink>
      </CharacterOtherAbilitiesNav>
    </li>
  </ul>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>