<script setup lang="ts">
  import { AbilityContext, } from '@/scripts/sources/ability';
  import { GamecoreNode, } from '@/scripts/sources/gamecore';

  defineProps<{node:GamecoreNode, abilityContext:AbilityContext}>()
</script>

<template>
  <div class="visual-block">Wait for anim state</div>
</template>

<style scoped>
</style>