<script setup lang="ts">
  import { cleanupFilename } from '@/common/common';
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TimelineName:string
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    
    Wait for timeline <em>{{ cleanupFilename(node.TimelineName) }}</em> to finish

  </BlockLayout>
</template>

<style scoped>
</style>