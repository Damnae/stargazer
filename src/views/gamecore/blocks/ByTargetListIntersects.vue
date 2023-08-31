<script setup lang="ts">
  import { GamecoreNode, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    FirstTargetType?:GamecoreTargetType
    SecondTargetType?:GamecoreTargetType
  }
</script>

<template>
  <BlockLayout :source="node">
    
    <em>{{ evaluateTargetType(node.FirstTargetType) }}</em> and <em>{{ evaluateTargetType(node.SecondTargetType) }}</em> have at least a character in common

  </BlockLayout>
</template>

<style scoped>
</style>