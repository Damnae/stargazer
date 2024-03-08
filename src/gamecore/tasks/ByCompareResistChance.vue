<script setup lang="ts">
  import { GamecoreTask, DynamicExpression, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType:GamecoreTargetType
    BehaviorFlagList:string[]
    CompareType:string
    CompareValue:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    <em><EvaluateTargetType :target="node.TargetType" /></em>'s 
    chance to resist
    <template v-if="node.BehaviorFlagList">
      <em>{{ node.BehaviorFlagList.join(', ') }}</em>
    </template>
    is
    <template v-if="node.CompareType">
      <em>{{ node.CompareType }}</em> to
    </template>
    <template v-if="node.CompareValue">
      <em><EvaluateExpression :expression="node.CompareValue" /></em>
    </template>×

  </BlockLayout>
</template>

<style scoped>
</style>