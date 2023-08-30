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
    Property:string
    PropertyValue?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Increase
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s
    </template>
    <template v-if="node.Property">
      <em>{{ node.Property }}</em>
    </template>
    by
    <template v-if="node.PropertyValue">
      <em><EvaluateExpression :expression="node.PropertyValue" /></em> 
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>