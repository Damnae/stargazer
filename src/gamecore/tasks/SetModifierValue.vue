<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
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
      
      {{ node.ModifyFunction }} 
      <em v-if="node.Value">
        <EvaluateExpression :expression="node.Value" />
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
      <em>{{ node.ValueType ?? 'Count' }}</em>
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
        <em>{{ node.ModifierName }}</em>'s
      </RouterLink>
      <template v-else>
        this modifier's
      </template>
      <em>{{ node.ValueType ?? 'Count' }}</em>
      to <em><EvaluateExpression :expression="node.Value" /></em>
      

    </template>
  </BlockLayout>
</template>

<style scoped>
</style>