<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getMonster, Monster, } from '@/scripts/sources/monster.ts';
  import { getMonsterSkillsByIds, MonsterSkill, } from '@/scripts/sources/monsterskill';
  import { getCharacterByMonster, Character } from '@/scripts/sources/character';
  import CharacterSkillAbilitiesNav from './CharacterSkillAbilitiesNav.vue';
  import CharacterOtherAbilitiesNav from './CharacterOtherAbilitiesNav.vue';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'

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
  <NavTree>
    <NavItem>
      <NavTree>
        <template #header>Skills</template>
        <template v-for="skill in monsterSkills" :key="skill.SkillID">
          <NavItem>
            <CharacterSkillAbilitiesNav v-if="character" :character="character" :skillTriggerKey="skill.SkillTriggerKey">
              <template #header>
                {{ skill.SkillTypeDesc.Text }} - {{ skill.SkillTag.Text }} 
                <span class="minor" :title="skill.SkillName.Text">{{ skill.SkillName.Text }}</span> 
                <span class="minor">{{ skill.SkillTriggerKey }}</span> 
              </template>
              <template #default="slotProps">
                <RouterLink :to="{ name:'monsterAbility', params:{ commitId: commitId, objectId: objectId, abilityId: slotProps.ability }}">
                  {{ slotProps.ability }}
                </RouterLink>
              </template>
            </CharacterSkillAbilitiesNav>
          </NavItem>
        </template>
      </NavTree>
    </NavItem>
    <NavItem v-if="character">
      <div></div>
      <CharacterOtherAbilitiesNav :character="character">
        <template #header>Other Abilities</template>
        <template #default="slotProps">
        <RouterLink :to="{ name:'monsterAbility', params:{ commitId: commitId, objectId: objectId, abilityId: slotProps.ability, }}">
          {{ slotProps.ability }}
        </RouterLink>
        </template>
      </CharacterOtherAbilitiesNav>
    </NavItem>
  </NavTree>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>