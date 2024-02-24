<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    CounterType:string
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Compare weakness for <em>{{ node.CounterType ?? "ActorCounterTarget" }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>