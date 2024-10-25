<script setup lang="ts">
  import { GamecoreTask, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import DynamicKey from '@/gamecore/DynamicKey.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    CustomKey:string
    ContextScope:string
    CustomValue?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">

    Set statistic <DynamicKey :dynamicKey="node.CustomKey" :contextScope="node.ContextScope" />
    to <em><EvaluateExpression :expression="node.CustomValue" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>