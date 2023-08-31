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
    Numbers?:DynamicExpression
    Order?:string
    BuffType?:string
    DispelCountKey?:string
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Dispel
    <template v-if="node.Numbers">
      <em><EvaluateExpression :expression="node.Numbers" /></em> of
    </template>
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s
    </template>
    
    <em>{{ node.Order ?? 'All' }} {{ node.BuffType ?? 'Debuff' }}</em>

    <template v-if="node.DispelCountKey">
      with key <em>{{ node.DispelCountKey }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>