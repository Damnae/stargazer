<script setup lang="ts">
  import { inject } from 'vue';
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
    ModifierName:string
    Value?:DynamicExpression
    ValueType?:string
    ModifyFunction:string
  }
  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">
    <template v-if="node.ModifyFunction">
      
      <em>{{ node.ModifyFunction }} <EvaluateExpression :expression="node.Value" /></em>
      to
      <RouterLink v-if="node.ModifierName" :to="createModifierRoute(node.ModifierName)">
        <em>{{ node.ModifierName }}</em>'s
      </RouterLink>
      <template v-else>
        this modifier's
      </template>
      <template v-if="node.ValueType">
        <em>{{ node.ValueType }}</em>
      </template>
      <template v-else>
        value(?)
      </template>
      <template v-if="node.TargetType">
        on <em>{{ evaluateTargetType(node.TargetType) }}</em>
      </template>

    </template>
    <template v-else>

      Set 
      <template v-if="node.TargetType">
        <em>{{ evaluateTargetType(node.TargetType) }}</em>'s
      </template>
      <RouterLink v-if="node.ModifierName" :to="createModifierRoute(node.ModifierName)">
        <em>{{ node.ModifierName }}</em>
      </RouterLink>'s
      value to <em><EvaluateExpression :expression="node.Value" /></em>

    </template>
  </BlockLayout>
</template>

<style scoped>
</style>