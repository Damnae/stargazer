<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    DataType:string
  }
</script>

<template>
  <BlockLayout :source="node">

    Get <em>{{ node.DataType }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>