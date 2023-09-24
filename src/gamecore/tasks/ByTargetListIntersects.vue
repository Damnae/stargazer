<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    FirstTargetType?:GamecoreTargetType
    SecondTargetType?:GamecoreTargetType
  }
</script>

<template>
  <BlockLayout :source="node">
    
    <em><EvaluateTargetType :target="node.FirstTargetType" /></em> 
    and <em><EvaluateTargetType :target="node.SecondTargetType" /></em> 
    have at least a character in common

  </BlockLayout>
</template>

<style scoped>
</style>