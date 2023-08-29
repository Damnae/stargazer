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
    DynamicKey:string
    CompareType:string
    CompareValue:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">

    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s
    </template>
    <em>{{ node.DynamicKey }}</em> is
    <em>{{ node.CompareType }}</em> to
    <em><EvaluateExpression :expression="node.CompareValue" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>