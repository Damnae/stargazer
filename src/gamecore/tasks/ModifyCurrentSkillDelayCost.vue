<script setup lang="ts">
  import { GamecoreTask,
    GamecoreTargetType, 
    DynamicExpression, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ModifyFunction:string
    NormalizedValue?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    {{ node.ModifyFunction ?? 'Modify' }}
    current skill action delay cost
    <template v-if="node.NormalizedValue">
      to <em><EvaluateExpression :expression="node.NormalizedValue" /></em>×
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>