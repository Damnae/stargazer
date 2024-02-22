<script setup lang="ts">
  import { GamecoreTask, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ScoringID:number
    ModifyFunction?:string
    ModifyValue:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    {{ node.ModifyFunction ?? "Add" }} <em><EvaluateExpression :expression="node.ModifyValue" /></em>
    to scoring item <em>{{ node.ScoringID }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>