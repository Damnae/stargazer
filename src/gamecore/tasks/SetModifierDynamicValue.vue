<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreTask, DynamicExpression, GamecoreTargetType, } from '@/sources/gamecore';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType:GamecoreTargetType
    ModifierName:string
    DynamicKey:string
    NewValue?:DynamicExpression
    ModifyFunction:string
  }

  if (node.DynamicKey)
    useHashStore().register(node.DynamicKey, true)
  
  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">
    <template v-if="node.ModifyFunction">
      
      {{ node.ModifyFunction }} 
      <em v-if="node.NewValue">
        <EvaluateExpression :expression="node.NewValue" />
      </em>
      <em v-else>
        -1
      </em>
      to
      <RouterLink v-if="node.ModifierName" :to="createModifierRoute(node.ModifierName)">
        <em>{{ node.ModifierName }}</em>'s
      </RouterLink>
      <template v-else>
        this modifier's
      </template>
      <em>{{ node.DynamicKey }}</em>
      <template v-if="node.TargetType">
        on <em><EvaluateTargetType :target="node.TargetType" /></em>
      </template>

    </template>
    <template v-else>

      Set 
      <template v-if="node.TargetType">
        <em><EvaluateTargetType :target="node.TargetType" /></em>'s
      </template>
      <RouterLink v-if="node.ModifierName" :to="createModifierRoute(node.ModifierName)">
        <em>{{ node.ModifierName }}</em>
      </RouterLink>'s
      <em>{{ node.DynamicKey }}</em>
      to <em><EvaluateExpression :expression="node.NewValue" /></em>

    </template>
  </BlockLayout>
</template>

<style scoped>
</style>