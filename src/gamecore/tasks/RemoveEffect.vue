<script setup lang="ts">
  import { GamecoreTask, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    Remove visual effect from <em>{{ evaluateTargetType(node.TargetType) }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>