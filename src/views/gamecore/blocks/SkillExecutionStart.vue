<script setup lang="ts">
  import { AbilityContext, } from '@/scripts/sources/ability';
  import { GamecoreNode, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  defineProps<{node:GamecoreNode, abilityContext:AbilityContext}>()
</script>

<template>
  <BlockLayout :source="node">
    Begin Skill
  </BlockLayout>
</template>

<style scoped>
</style>