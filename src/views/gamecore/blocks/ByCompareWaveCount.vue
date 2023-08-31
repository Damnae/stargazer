<script setup lang="ts">
  import { GamecoreNode, 
    DynamicExpression,
    GamecoreTargetType, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    CompareType:string
    CompareValue:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Wave count is
    <template v-if="node.CompareType">
      <em>{{ node.CompareType }}</em> to
    </template>
    <template v-if="node.CompareValue">
      <em><EvaluateExpression :expression="node.CompareValue" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>