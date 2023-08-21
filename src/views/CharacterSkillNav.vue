<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getCharacterByAvatar, Character } from '../scripts/sources/character';

  const props = defineProps<{skillTriggerKey:string, character:Character}>()
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