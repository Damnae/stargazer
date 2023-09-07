<script setup lang="ts">
  import { GamecoreTask,
    GamecoreTargetType, evaluateTargetType, 
    DynamicExpression,
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    SplitTarget?:GamecoreTargetType
    SelfSplitRatio:DynamicExpression
    TargetSplitRatio?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Split damage taken with <em>{{ evaluateTargetType(node.SplitTarget) }}</em>;
    take <em><EvaluateExpression :expression="node.SelfSplitRatio" /></em>×,
    they take <em><EvaluateExpression :expression="node.TargetSplitRatio" /></em>×

  </BlockLayout>
</template>

<style scoped>
</style>