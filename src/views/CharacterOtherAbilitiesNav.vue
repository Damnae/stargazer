<script setup lang="ts">
  import { Character } from '../scripts/sources/character';

  defineProps<{character:Character}>()
</script>

<template>
  <div>Other Abilities</div>
  <ul>
    <template v-for="ability in character.AbilityList" :key="ability">
      <li>
        <span :title="ability">{{ ability }}</span>
      </li>
    </template>
  </ul>
</template>

<style scoped>
</style>