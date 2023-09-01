<script setup lang="ts">
  import { GamecoreNode, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    Attach a visual effect to <em>{{ evaluateTargetType(node.TargetType) }}</em>'s modifier

  </BlockLayout>
</template>

<style scoped>
</style>