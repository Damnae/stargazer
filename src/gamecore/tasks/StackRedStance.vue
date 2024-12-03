<script setup lang="ts">
  import { GamecoreTask, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    RedStanceRatio?:DynamicExpression
    RedStanceValue?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Apply 
    <template v-if="node.RedStanceRatio">
      <em><EvaluateExpression :expression="node.RedStanceRatio" /></em>×
    </template>
    <template v-if="node.RedStanceValue">
      +<em><EvaluateExpression :expression="node.RedStanceValue" /></em>
    </template>
    Exo-Toughness
  </BlockLayout>
</template>

<style scoped>
</style>