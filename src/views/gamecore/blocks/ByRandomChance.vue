<script setup lang="ts">
  import { GamecoreNode, 
    DynamicExpression, evaluateDynamicExpression, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    Chance:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    <em>{{ evaluateDynamicExpression(node.Chance) }}</em>% chance
  </BlockLayout>
</template>

<style scoped>
</style>