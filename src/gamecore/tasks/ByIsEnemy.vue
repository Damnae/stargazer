<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetTypeA:GamecoreTargetType
    TargetTypeB:GamecoreTargetType
  }
</script>

<template>
  <BlockLayout :source="node">

    <em><EvaluateTargetType :target="node.TargetTypeA" /></em> 
    is an enemy of 
    <em><EvaluateTargetType :target="node.TargetTypeB" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>