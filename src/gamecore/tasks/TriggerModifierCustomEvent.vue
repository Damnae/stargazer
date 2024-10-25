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
    CasterFilter?:GamecoreTargetType
    EventType?:string
    DynamicKey?:string
    ContextScope:string
    Value?:DynamicExpression
    MaxNumber?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Trigger
    <template v-if="node.MaxNumber">
      up to <em><EvaluateExpression :expression="node.MaxNumber" /></em>
    </template>
    modifiers custom event 
    <template v-if="node.EventType">
      <em>{{ node.EventType }}</em>
    </template>
    <template v-if="node.CasterFilter">
      applied by <em><EvaluateTargetType :target="node.CasterFilter" /></em>
    </template>
    <template v-if="node.TargetType">
      on <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>
    
    <template v-if="node.DynamicKey">
      with <DynamicKey :dynamicKey="node.DynamicKey" :contextScope="node.ContextScope" />
    </template>
    <template v-if="node.Value">
      set to <em><EvaluateExpression :expression="node.Value" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>