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
    TargetType?:GamecoreTargetType
    AddNormalizedValue?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Change 
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s
    </template>
    action delay
    <template v-if="node.TargetType">
      by <em><EvaluateExpression :expression="node.AddNormalizedValue" /></em>×
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>