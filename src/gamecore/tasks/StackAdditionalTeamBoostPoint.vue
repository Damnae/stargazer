<script setup lang="ts">
  import { GamecoreTask, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ModifyValue:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Add <em><EvaluateExpression :expression="node.ModifyValue" /></em> to the max skill point count

  </BlockLayout>
</template>

<style scoped>
</style>