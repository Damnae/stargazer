<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
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
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s
    </template>
    <em>{{ node.BehaviorFlag }}</em>
    resistance by
    <em><EvaluateExpression :expression="node.Resistance" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>