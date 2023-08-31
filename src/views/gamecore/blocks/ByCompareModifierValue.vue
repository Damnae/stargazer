<script setup lang="ts">
  import { inject, } from 'vue';
  import { GamecoreNode, 
    DynamicExpression, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    ModifierName:string
    ValueType:string
    CompareType?:string
    CompareValue?:DynamicExpression
  }

  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">
    
    Modifier 
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