<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import DynamicKey from '@/gamecore/DynamicKey.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    DynamicKey:string
    ContextScope:string
    CompareType:string
    CompareValue:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">

    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s
    </template>
    <DynamicKey :dynamicKey="node.DynamicKey" :contextScope="node.ContextScope" /> is
    <em>{{ node.CompareType }}</em> to
    <em><EvaluateExpression :expression="node.CompareValue" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>