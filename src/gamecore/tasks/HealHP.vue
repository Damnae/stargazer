<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    HealPercentage?:DynamicExpression
    ModifyValue?:DynamicExpression
    FormulaType:string
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Heal
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>
    
    for 
    <template v-if="node.HealPercentage">
      <em><EvaluateExpression :expression="node.HealPercentage" /></em>× HP
    </template>
    <template v-if="node.ModifyValue">
      <template v-if="node.HealPercentage"> + </template>
      <em><EvaluateExpression :expression="node.ModifyValue" /></em> HP
    </template>

    by <em>{{ node.FormulaType ?? 'HealByHealerAttack' }}</em>
  </BlockLayout>
</template>

<style scoped>
</style>