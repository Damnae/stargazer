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
    BarType?:number
    CurrentState?:string
    CD?:DynamicExpression
    ActiveCount?:DynamicExpression
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
    power bar;

    <span v-if="node.Active || node.CurrentState">
      State: <em>{{node.Active }}</em> / <em>{{node.CurrentState }}</em>
    </span>
    <span v-if="node.BarType">
      Type: <em>{{node.BarType }}</em>
    </span>
    <span v-if="node.CD">
      Cooldown: <em><EvaluateExpression :expression="node.CD" /></em>
    </span>
    <span v-if="node.ActiveCount">
      Active Count: <em><EvaluateExpression :expression="node.ActiveCount" /></em>
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