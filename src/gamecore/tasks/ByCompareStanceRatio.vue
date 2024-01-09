<script setup lang="ts">
  import { inject, } from 'vue';
  import { GamecoreTask, DynamicExpression, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType:GamecoreTargetType
    ModifierName:string
    ValueType:string
    CompareType?:string
    CompareValue?:DynamicExpression
  }

  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">
    
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s
    </template>
    toughness ratio is 
    <RouterLink v-if="node.ModifierName" :to="createModifierRoute(node.ModifierName)">
      <em>{{ node.ModifierName }}</em>'s
    </RouterLink>
    
    <template v-if="node.ValueType">
      <em>{{ node.ValueType }}</em> is 
    </template>
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