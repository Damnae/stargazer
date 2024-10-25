<script setup lang="ts">
  import { GamecoreTask, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import DynamicKey from '@/gamecore/DynamicKey.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    DynamicKey:string
    ContextScope:string
    Min?:DynamicExpression
    Max?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">

    Set <DynamicKey :dynamicKey="node.DynamicKey" :contextScope="node.ContextScope" />
    to a random value between <em><EvaluateExpression :expression="node.Min" /></em> 
    and <em><EvaluateExpression :expression="node.Max" /></em> 

  </BlockLayout>
</template>

<style scoped>
</style>