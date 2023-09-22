<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { cleanupMarkup } from '@/common/common';
  import { getMonster, type Monster, } from '@/sources/monster.ts';
  import { getMonsterSkillsByIds, MonsterSkill, } from '@/sources/monsterskill';
  import { getCharacterByMonster, Character } from '@/sources/character';
  import { TaskContextType } from '@/sources/ability';
  import CharacterSkillAbilitiesNav from './CharacterSkillAbilitiesNav.vue';
  import CharacterOtherAbilitiesNav from './CharacterOtherAbilitiesNav.vue';
  import CharacterModifiers from './CharacterModifiers.vue';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'
  import LoadingNav from '@/components/LoadingNav.vue';

  const props = defineProps<{commitId:string, objectId:number}>()

  const monster = ref<Monster>()
  const monsterSkills = ref<MonsterSkill[]>([])
  const character = ref<Character>()

  const loading = ref(true)
  watchEffect(async () => 
  {
    loading.value = true
    monster.value = await getMonster(props.commitId, props.objectId)
    monsterSkills.value = await getMonsterSkillsByIds(props.commitId, monster.value.SkillList)
    character.value = await getCharacterByMonster(props.commitId, monster.value)
    loading.value = false
  })
</script>

<template>
  <div v-if="loading">
    <LoadingNav />
  </div>
  <div v-else-if="monster" :key="objectId">
    <h1>{{ monster.MonsterName.Text }}</h1>
    <span v-if="!character" class="minor">(Missing character data)</span>
    <NavTree>

      <NavItem>
        <NavTree :startsOpen="true">
          <template #header>Skills</template>
          <NavItem v-for="skill in monsterSkills" :key="skill.SkillID">
            <CharacterSkillAbilitiesNav :character="character" :skillTriggerKey="skill.SkillTriggerKey">
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
              <template #footer>
                {{ cleanupMarkup(skill.SkillDesc.Text) }}
                <span v-if="skill.SPHitBase?.Value" class="oneline">
                  (+{{ skill.SPHitBase.Value }} Energy on hit)
                </span>
              </template>
            </CharacterSkillAbilitiesNav>
          </NavItem>
        </NavTree>
      </NavItem>

      <NavItem v-if="character">
        <CharacterOtherAbilitiesNav :character="character">
          <template #header>Other Abilities</template>
          <template #default="slotProps">
            <RouterLink :to="{ name:'monsterAbility', params:{ commitId: commitId, objectId: objectId, abilityId: slotProps.ability, }}">
              {{ slotProps.ability }}
            </RouterLink>
          </template>
        </CharacterOtherAbilitiesNav>
      </NavItem>

      <NavItem v-if="character">
        <NavTree>
          <template #header>Modifiers</template>
          <CharacterModifiers :character="character" :taskContextType="TaskContextType.Monster" v-slot="slotProps">
            <RouterLink :to="{ name:'monsterModifier', params:{ commitId: commitId, objectId: objectId, modifierId: slotProps.modifier, }}">
              {{ slotProps.modifier }}
            </RouterLink>
          </CharacterModifiers>
        </NavTree>
      </NavItem>

    </NavTree>
  </div>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>