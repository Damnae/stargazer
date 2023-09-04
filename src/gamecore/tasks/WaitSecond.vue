<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    WaitTime:number
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    Wait for 
    <em>{{ node.WaitTime }}</em> seconds
  </BlockLayout>
</template>

<style scoped>
</style>