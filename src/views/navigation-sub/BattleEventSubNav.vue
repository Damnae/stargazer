<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { cleanupMarkup, cleanupNumber } from '@/common/common';
  import { evaluateDescription } from '@/sources/gamecore';
  import { getBattleEvent, type BattleEvent } from '@/sources/battleevent';
  import { BattleEventSkill, getBattleEventSkillsByIds } from '@/sources/battleeventskill';
  import { getCharacterByBattleEvent, Character } from '@/sources/character';
  import { TaskContextType } from '@/sources/ability';
  import CharacterSkillAbilitiesNav from './CharacterSkillAbilitiesNav.vue';
  import CharacterOtherAbilitiesNav from './CharacterOtherAbilitiesNav.vue';
  import CharacterModifiers from './CharacterModifiers.vue';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'
  import LoadingNav from '@/components/LoadingNav.vue';

  const props = defineProps<{commitId:string, objectId:number}>()

  const battleEvent = ref<BattleEvent>()
  const battleEventSkills = ref<BattleEventSkill[]>([])
  const character = ref<Character>()

  const loading = ref(true)
  watchEffect(async () => 
  {
    loading.value = true
    battleEvent.value = await getBattleEvent(props.commitId, props.objectId)
    battleEventSkills.value = battleEvent.value.Data ? await getBattleEventSkillsByIds(props.commitId, battleEvent.value.Data.SkillIDList) : []
    character.value = await getCharacterByBattleEvent(props.commitId, battleEvent.value)
    loading.value = false
  })
</script>

<template>
  <div v-if="loading">
    <LoadingNav />
  </div>
  <div v-else-if="battleEvent" :key="objectId">
    <h1>{{ battleEvent.BattleEventName }}</h1>
    <span v-if="!character" class="minor">(Missing character data)</span>
    <NavTree>

      <NavItem>
        <NavTree :startsOpen="true">
          <template #header>Skills</template>
          <NavItem v-for="skill in battleEventSkills" :key="skill.SkillID">
            <CharacterSkillAbilitiesNav :character="character" :skillTriggerKey="skill.SkillTriggerKey">
              <template #header>
                {{ skill.SkillTypeDesc.Text }} - {{ skill.SkillTag.Text }} 
                <span class="minor" :title="skill.SkillName.Text">{{ skill.SkillName.Text }}</span> 
                <span class="minor">{{ skill.SkillTriggerKey }}</span> 
              </template>
              <template #default="slotProps">
                <RouterLink :to="{ name:'battleEventAbility', params:{ commitId: commitId, objectId: objectId, abilityId: slotProps.ability }}">
                  {{ slotProps.ability }}
                </RouterLink>
              </template>
              <template #footer>
                {{ cleanupMarkup(skill.SkillDesc.Text) }}
              </template>
            </CharacterSkillAbilitiesNav>
          </NavItem>
        </NavTree>
      </NavItem>
      
      <NavItem v-if="battleEvent.AbilityList">
        <NavTree :startsOpen="true">
          <template #header>Abilities</template>
          <NavItem v-for="ability in battleEvent.AbilityList">
            <span :title="ability">
              <RouterLink :to="{ name:'battleEventAbility', params:{ commitId: commitId, objectId: objectId, abilityId: ability, }}">
                {{ ability }}
              </RouterLink>
            </span>
          </NavItem>
        </NavTree>
      </NavItem>

      <NavItem v-if="character">
        <CharacterOtherAbilitiesNav :character="character">
          <template #header>Other Abilities</template>
          <template #default="slotProps">
            <RouterLink :to="{ name:'battleEventAbility', params:{ commitId: commitId, objectId: objectId, abilityId: slotProps.ability, }}">
              {{ slotProps.ability }}
            </RouterLink>
          </template>
        </CharacterOtherAbilitiesNav>
      </NavItem>

      <NavItem v-if="character">
        <NavTree>
          <template #header>Modifiers</template>
          <CharacterModifiers :character="character" :taskContextType="TaskContextType.BattleEvent" v-slot="slotProps">
            <RouterLink :to="{ name:'battleEventModifier', params:{ commitId: commitId, objectId: objectId, modifierId: slotProps.modifier, }}">
              {{ slotProps.modifier }}
            </RouterLink>
          </CharacterModifiers>
        </NavTree>
      </NavItem>
      
    </NavTree>
    <p>
      <h2>Effect</h2>
      <div v-for="property in battleEvent.OverrideProperty">
        {{ property.PropertyType }}: {{ cleanupNumber(property.Value?.Value) }}
      </div>
      <div v-if="battleEvent.Speed">
        Speed: {{ cleanupNumber(battleEvent.Speed.Value) }}
      </div>
      <span class="minor">{{ evaluateDescription(battleEvent.DescrptionText, battleEvent.ParamList) }}</span>
    </p>
  </div>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>