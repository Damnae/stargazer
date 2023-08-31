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
    ModifyValue?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Change
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s
    </template>
    HP
    <template v-if="node.ModifyValue">
      to <em><EvaluateExpression :expression="node.ModifyValue" /></em>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>