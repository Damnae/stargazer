<script setup lang="ts">
  import { GamecoreNode, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  defineProps<{node:GamecoreNode}>()
</script>

<template>
  <BlockLayout :source="node">
    Begin Skill
  </BlockLayout>
</template>

<style scoped>
</style>