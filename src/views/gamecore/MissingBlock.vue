<script setup lang="ts">
  import { GamecoreNode, } from '@/scripts/sources/gamecore';
  import { cleanGamecoreName, } from '@/scripts/common';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  defineProps<{node:GamecoreNode}>()
</script>

<template>
  <BlockLayout :source="node">
    <span class="notimplemented">{{ cleanGamecoreName(node.$type) }}</span>
  </BlockLayout>
</template>

<style scoped>
</style>