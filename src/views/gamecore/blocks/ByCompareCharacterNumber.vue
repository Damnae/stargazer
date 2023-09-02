<script setup lang="ts">
  import { GamecoreNode, 
    DynamicExpression,
    GamecoreTargetType, evaluateTargetType, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    CompareType:string
    CompareNumber:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    <em>{{ evaluateTargetType(node.TargetType) }}</em>
    character count is
    <template v-if="node.CompareType">
      <em>{{ node.CompareType }}</em> to 
    </template>
    <template v-if="node.CompareNumber">
      <em><EvaluateExpression :expression="node.CompareNumber" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>