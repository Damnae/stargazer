<script setup lang="ts">
  import { DynamicExpression, GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    WaitTime:number|DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    Wait for parallel time to reach
    <template v-if="typeof(node.WaitTime) == 'number'">
      <em>{{ node.WaitTime }}</em> 
    </template>
    <template v-else>
      <em><EvaluateExpression :expression="node.WaitTime" /></em> 
    </template>
    seconds
  </BlockLayout>
</template>

<style scoped>
</style>