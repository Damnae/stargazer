<script setup lang="ts">
  import { AbilityContext, } from '@/scripts/sources/ability';
  import { GamecoreNode, } from '@/scripts/sources/gamecore';
  import { cleanGamecoreName, } from '@/scripts/common';

  defineProps<{node:GamecoreNode, abilityContext:AbilityContext}>()
</script>

<template>
  <div class="notimplemented-block">{{ cleanGamecoreName(node.$type) }}</div>
</template>

<style scoped>
 .notimplemented
 {
    color:rgb(64, 32, 32);
 } 
</style>