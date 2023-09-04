<script setup lang="ts">
  import { GamecoreTask, 
    DynamicExpression, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Chance:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    <em><EvaluateExpression :expression="node.Chance" /></em>× chance
  </BlockLayout>
</template>

<style scoped>
</style>