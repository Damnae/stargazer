<script setup lang="ts">
  import { GamecoreNode, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ModifierName:string
  }
</script>

<template>
  <BlockLayout :source="node">

    <em>{{ evaluateTargetType(node.TargetType) }}</em>
    has modifier
    <em>{{ node.ModifierName }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>