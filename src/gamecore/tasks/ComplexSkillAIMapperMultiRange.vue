<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Ranges:
    [
      {
        xmin: { Value: number }
        xmax: { Value: number }
        ymin: { Value: number }
        ymax: { Value: number }
      }
    ]
  }
</script>

<template>
  <BlockLayout :source="node">

    Remap the value

  </BlockLayout>
</template>

<style scoped>
</style>