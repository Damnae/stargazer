<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    Active?:string
    OuterState?:string
    MaxCount?:DynamicExpression
    CurrentCount?:DynamicExpression
    ShowCount?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    Update
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s 
    </template>
    monster power bar;

    <span v-if="node.Active || node.OuterState">
      State: <em>{{node.Active }}</em> / <em>{{node.OuterState }}</em>
    </span>
    <span v-if="node.ShowCount">
      Show Count: <em><EvaluateExpression :expression="node.ShowCount" /></em>
      / <em><EvaluateExpression :expression="node.MaxCount" /></em>
    </span>
    <span v-if="node.CurrentCount">
      Count: <em><EvaluateExpression :expression="node.CurrentCount" /></em> 
      / <em><EvaluateExpression :expression="node.MaxCount" /></em>
    </span>

  </BlockLayout>
</template>

<style scoped>
</style>