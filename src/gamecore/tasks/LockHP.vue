<script setup lang="ts">
  import { GamecoreTask, 
    GamecoreTargetType, evaluateTargetType, DynamicExpression, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    Threshold:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Lock 
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s
    </template>
    HP to <em><EvaluateExpression :expression="node.Threshold" /> </em>×

  </BlockLayout>
</template>

<style scoped>
</style>