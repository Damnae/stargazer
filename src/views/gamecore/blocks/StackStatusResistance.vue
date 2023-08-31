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
    Resistance?:DynamicExpression
    BehaviorFlag?:string
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Increase
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s
    </template>
    <em>{{ node.BehaviorFlag }}</em>
    resistance by
    <em><EvaluateExpression :expression="node.Resistance" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>