<script setup lang="ts">
  import { GamecoreTask, DynamicExpression, } from '@/sources/gamecore';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    CustomKey:string
    CustomValue?:DynamicExpression
  }

  if (node.CustomKey)
    useHashStore().register(node.CustomKey, true)
</script>

<template>
  <BlockLayout :source="node">

    Set statistic <em>{{ node.CustomKey }}</em>
    to <em><EvaluateExpression :expression="node.CustomValue" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>