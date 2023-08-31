<script setup lang="ts">
  import { GamecoreNode, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    CompareType?:GamecoreTargetType
  }
</script>

<template>
  <BlockLayout :source="node">
    
    <em>{{ evaluateTargetType(node.TargetType) }}</em> is <em>{{ evaluateTargetType(node.CompareType) }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>