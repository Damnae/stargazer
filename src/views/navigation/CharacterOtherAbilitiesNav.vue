<script setup lang="ts">
  import { Character } from '../../scripts/sources/character';

  defineProps<{character:Character}>()
</script>

<template>
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