<script setup lang="ts">
  import { GamecoreTask, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    BattleTargetID:DynamicExpression
    ModifyFunction?:string
    ModifyValue:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    {{ node.ModifyFunction ?? "Add" }} <em><EvaluateExpression :expression="node.ModifyValue" /></em>
    to target progress <em><EvaluateExpression :expression="node.BattleTargetID" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>