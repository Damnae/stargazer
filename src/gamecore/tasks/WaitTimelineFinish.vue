<script setup lang="ts">
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
    
    Wait for timeline <em>{{ node.TimelineName }}</em> to finish

  </BlockLayout>
</template>

<style scoped>
</style>