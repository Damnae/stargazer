<script setup lang="ts">
  import { GamecoreTask, DynamicExpression, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    CompareType:string
    CompareNumber:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    <em><EvaluateTargetType :target="node.TargetType" /></em>
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