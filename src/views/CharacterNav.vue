<script setup lang="ts">
  import { Character } from '../scripts/sources/character';

  defineProps<{character:Character}>()
</script>

<template>
  <div>Abilities</div>
  <ul>
    <template v-for="skillAbilities in character.SkillAbilityList">
      <li>
        <div>{{ skillAbilities.Skill }}</div>
        <ul>
          <template v-for="ability in skillAbilities.AbilityList">
            <li>
              <span :title="ability">{{ ability }}</span>
            </li>
          </template>
        </ul>
      </li>
    </template>
    <li>
      <div>Other Abilities</div>
      <ul>
        <template v-for="ability in character.AbilityList">
          <li>
            <span :title="ability">{{ ability }}</span>
          </li>
        </template>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
</style>