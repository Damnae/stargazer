<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    PhaseNum:number
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Change <em><EvaluateTargetType :target="node.TargetType" /></em>'s phase
    to <em>{{ node.PhaseNum }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>