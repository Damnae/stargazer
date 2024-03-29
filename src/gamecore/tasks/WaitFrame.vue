<script setup lang="ts">
  import { DynamicExpression, GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    WaitFrameCount:number|DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    Wait for 
    <template v-if="typeof(node.WaitFrameCount) == 'number'">
      <em>{{ node.WaitFrameCount }}</em> 
    </template>
    <template v-else>
      <em><EvaluateExpression :expression="node.WaitFrameCount" /></em> 
    </template>
    frames
  </BlockLayout>
</template>

<style scoped>
</style>