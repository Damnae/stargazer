<script setup lang="ts">
  import { GamecoreTask, DynamicExpression, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    From?:GamecoreTargetType
    To?:GamecoreTargetType
    CompareType:string
    CompareValue:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Distance
    <template v-if="node.From">
      from <em><EvaluateTargetType :target="node.From" /></em>
    </template>
    <template v-if="node.To">
      to <em><EvaluateTargetType :target="node.To" /></em>
    </template>
    is
    <template v-if="node.CompareType">
      <em>{{ node.CompareType }}</em> to 
    </template>
    <template v-if="node.CompareValue">
      <em><EvaluateExpression :expression="node.CompareValue" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>