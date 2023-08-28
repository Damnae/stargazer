<script setup lang="ts">
  import { AbilityContext, } from '@/scripts/sources/ability';
  import { GamecoreNode, } from '@/scripts/sources/gamecore';
  import { cleanGamecoreName, } from '@/scripts/common';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  defineProps<{node:GamecoreNode, abilityContext:AbilityContext}>()
</script>

<template>
  <BlockLayout :source="node">
    <span class="notimplemented">{{ cleanGamecoreName(node.$type) }}</span>
  </BlockLayout>
</template>

<style scoped>
</style>