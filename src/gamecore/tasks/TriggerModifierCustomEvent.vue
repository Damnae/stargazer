<script setup lang="ts">
  import { GamecoreTask,
    GamecoreTargetType, evaluateTargetType, 
    DynamicExpression, 
  } from '@/sources/gamecore';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    EventType?:string
    DynamicKey?:string
    Value?:DynamicExpression
    MaxNumber?:DynamicExpression
  }
  
  if (node.DynamicKey)
    useHashStore().register(node.DynamicKey, true)
</script>

<template>
  <BlockLayout :source="node">
    
    Trigger
    <template v-if="node.MaxNumber">
      up to <em><EvaluateExpression :expression="node.MaxNumber" /></em> of
    </template>
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s
    </template>
    
    modifiers custom event 
    <template v-if="node.EventType">
      <em>{{ node.EventType }}</em>
    </template>
    <template v-if="node.DynamicKey">
      with <em>{{ node.DynamicKey }}</em>
    </template>
    <template v-if="node.Value">
      set to <em><EvaluateExpression :expression="node.Value" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>