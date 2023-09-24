<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ModifierBehaviorFlags:string[]
    Value?:DynamicExpression
    ValueType?:string
    ModifyFunction:string
  }
</script>

<template>
  <BlockLayout :source="node">
    <template v-if="node.ModifyFunction">
      
      {{ node.ModifyFunction }} <em><EvaluateExpression :expression="node.Value" /></em>
      to modifiers with flag <em>{{ node.ModifierBehaviorFlags.join(', ') }}</em>'s
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
      modifiers with flag <em>{{ node.ModifierBehaviorFlags.join(', ') }}</em>'s
      <em>{{ node.ValueType ?? 'Count' }}</em>
      to <em><EvaluateExpression :expression="node.Value" /></em>

    </template>
  </BlockLayout>
</template>

<style scoped>
</style>