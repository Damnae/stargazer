<script setup lang="ts">
  import { GamecoreTask,
    GamecoreTargetType, evaluateTargetType, 
    DynamicExpression,
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ModifyFunction:string
    ModifyValue?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    {{ node.ModifyFunction ?? 'Modify' }}
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s
    </template>
    <template v-else>
      character
    </template>
    skill points
    <template v-if="node.ModifyValue">
      to <em><EvaluateExpression :expression="node.ModifyValue" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>