<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    CompareType?:GamecoreTargetType
  }
</script>

<template>
  <BlockLayout :source="node">
    
    <em><EvaluateTargetType :target="node.TargetType" /></em> 
    is <em><EvaluateTargetType :target="node.CompareType" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>