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
    DynamicKey:string
    ContextScope:string
    ResetValue?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">

    Define <em v-if="node.ContextScope">{{ node.ContextScope }}.</em><em>{{ node.DynamicKey }}</em>
    to <em><EvaluateExpression :expression="node.ResetValue" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>