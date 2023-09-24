<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    Threshold:DynamicExpression
    LockKey:string
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Lock 
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s
    </template>
    HP to <em><EvaluateExpression :expression="node.Threshold" /> </em>×
    with key <em>{{ node.LockKey }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>