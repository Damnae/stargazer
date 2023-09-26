<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    UniqueName:number
  }
</script>

<template>
  <BlockLayout :source="node">

    Fetch with unique name <em>{{ node.UniqueName }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>