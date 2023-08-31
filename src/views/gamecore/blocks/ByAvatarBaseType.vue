<script setup lang="ts">
  import { GamecoreNode, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    BaseTypeList:string[]
  }
</script>

<template>
  <BlockLayout :source="node">
    
    <em>{{ evaluateTargetType(node.TargetType) }}</em>
    is on the <em>{{ node.BaseTypeList.join(', ') }}</em> path

  </BlockLayout>
</template>

<style scoped>
</style>