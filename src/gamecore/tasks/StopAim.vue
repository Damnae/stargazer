<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  defineProps<{node:GamecoreTask}>()
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    
    Stop aiming

  </BlockLayout>
</template>

<style scoped>
</style>