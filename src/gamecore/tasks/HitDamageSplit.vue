<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
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
    
    Split damage taken with <em><EvaluateTargetType :target="node.SplitTarget" /></em>;
    take <em><EvaluateExpression :expression="node.SelfSplitRatio" /></em>×,
    they take <em><EvaluateExpression :expression="node.TargetSplitRatio" /></em>×

  </BlockLayout>
</template>

<style scoped>
</style>