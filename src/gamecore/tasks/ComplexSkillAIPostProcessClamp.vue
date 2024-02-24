<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    minValue:{ Value: number }
    maxValue:{ Value: number }
  }
</script>

<template>
  <BlockLayout :source="node">

    Clamp the value between <em>{{ node.minValue?.Value }}</em> and <em>{{ node.maxValue?.Value }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>