<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  defineProps<{node:GamecoreTask}>()
</script>

<template>
  <BlockLayout :source="node">
    
    Escape from battle

  </BlockLayout>
</template>

<style scoped>
</style>