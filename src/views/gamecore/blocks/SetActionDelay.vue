<script setup lang="ts">
  import { GamecoreNode,
    GamecoreTargetType, evaluateTargetType, 
    DynamicExpression, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    Value?:DynamicExpression
    NormalizedValue?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Change
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s
    </template>
    action delay
    <template v-if="node.Value">
      to <em><EvaluateExpression :expression="node.Value" /></em>
    </template>
    <template v-if="node.NormalizedValue">
      to <em><EvaluateExpression :expression="node.NormalizedValue" /></em>×
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>