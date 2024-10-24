<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import ModifierLink from '@/gamecore/ModifierLink.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ModifierName:string
    Value?:DynamicExpression
    ValueType?:string
    ModifyFunction:string
  }
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
      <template v-if="node.ModifierName">
        <ModifierLink :modifierName="node.ModifierName" />'s
      </template>
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
      <template v-if="node.ModifierName">
        <ModifierLink :modifierName="node.ModifierName" />'s
      </template>
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