<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    CurrentCount?:DynamicExpression
    MaxCount?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    Update
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s 
    </template>
    inner energy bar

    <span v-if="node.CurrentCount">
      to <em><EvaluateExpression :expression="node.CurrentCount" /></em> 
      / <em><EvaluateExpression :expression="node.MaxCount" /></em>
    </span>

  </BlockLayout>
</template>

<style scoped>
</style>