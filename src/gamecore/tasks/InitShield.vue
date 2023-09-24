<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ShieldPercentage?:DynamicExpression
    ShieldValue?:DynamicExpression
    FormulaType?:string
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Apply a
    <template v-if="node.ShieldPercentage">
      <em><EvaluateExpression :expression="node.ShieldPercentage" /></em>×
    </template>
    <template v-if="node.ShieldValue">
      <template v-if="node.ShieldPercentage"> + </template>
      <em><EvaluateExpression :expression="node.ShieldValue" /></em>
    </template>
    shield
    <template v-if="node.TargetType">
      to <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>
    <template v-if="node.FormulaType">
      using <em>{{ node.FormulaType }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>