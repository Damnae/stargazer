<script setup lang="ts">
  import { GamecoreTask, 
    DynamicExpression, 
  } from '@/sources/gamecore';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    DynamicKey:string
    ContextScope:string
    Value?:DynamicExpression
  }

  if (node.DynamicKey)
    useHashStore().register(node.DynamicKey, true)
</script>

<template>
  <BlockLayout :source="node">

    Set <em v-if="node.ContextScope">{{ node.ContextScope }}.</em><em>{{ node.DynamicKey }}</em>
    to <em><EvaluateExpression :expression="node.Value" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>