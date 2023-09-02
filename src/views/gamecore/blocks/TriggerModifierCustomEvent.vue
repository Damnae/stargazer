<script setup lang="ts">
  import { GamecoreNode,
    GamecoreTargetType, evaluateTargetType, 
    DynamicExpression, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    EventType?:string
    DynamicKey?:string
    Value?:DynamicExpression
    MaxNumber?:DynamicExpression
  }
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