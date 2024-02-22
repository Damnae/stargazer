<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    AchievementID:number
  }
</script>

<template>
  <BlockLayout :source="node">
   
    Complete achievement <em>{{ node.AchievementID }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>