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
    ValueList?:DynamicExpression[]
  }

  if (node.DynamicKey)
    useHashStore().register(node.DynamicKey, true)
</script>

<template>
  <BlockLayout :source="node">

    Set <em v-if="node.ContextScope">{{ node.ContextScope }}.</em><em>{{ node.DynamicKey }}</em>
    to a random value in 
    <template v-for="value in node.ValueList">
      <em><EvaluateExpression :expression="value" /></em>, 
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>