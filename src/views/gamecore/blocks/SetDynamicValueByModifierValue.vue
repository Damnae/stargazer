<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreNode, 
    GamecoreTargetType, evaluateTargetType, 
    DynamicExpression,
  } from '@/scripts/sources/gamecore';
  import useHashStore from '@/scripts/hashstore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    ReadTargetType?:GamecoreTargetType
    ModifierName:string
    DynamicKey:string
    ValueType?:string
    Multiplier?:DynamicExpression
  }
  
  if (node.DynamicKey)
    useHashStore().register(node.DynamicKey, true)

  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">
    
    Set <em>{{ node.DynamicKey }}</em>

    to 
    <template v-if="node.ReadTargetType">
      <em>{{ evaluateTargetType(node.ReadTargetType) }}</em>'s
    </template>
    <em><EvaluateExpression :expression="node.Multiplier" /></em>x
    <RouterLink v-if="node.ModifierName" :to="createModifierRoute(node.ModifierName)">
      <em>{{ node.ModifierName }}</em>
    </RouterLink>

  </BlockLayout>
</template>

<style scoped>
</style>