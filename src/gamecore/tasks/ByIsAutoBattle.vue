<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
  }
</script>

<template>
  <BlockLayout :source="node">
   
    Auto battle is enabled

  </BlockLayout>
</template>

<style scoped>
</style>