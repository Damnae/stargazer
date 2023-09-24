<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
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

    to <em><EvaluateExpression :expression="node.Multiplier" /></em>× of
    <RouterLink v-if="node.ModifierName" :to="createModifierRoute(node.ModifierName)">
      <em>{{ node.ModifierName }}</em>'s
    </RouterLink>
    <template v-else>
      this modifier's
    </template>
    <em>{{ node.ValueType ?? 'Count' }}</em>
    <template v-if="node.ReadTargetType">
      on <em><EvaluateTargetType :target="node.ReadTargetType" /></em>
    </template>


  </BlockLayout>
</template>

<style scoped>
</style>