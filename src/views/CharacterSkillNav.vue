<script setup lang="ts">
  import { Character } from '../scripts/sources/character';

  defineProps<{skillTriggerKey:string, character:Character}>()
</script>

<template>
  <ul>
    <li>
      {{ skillTriggerKey }}
    </li>
  </ul>
</template>

<style scoped>
</style>