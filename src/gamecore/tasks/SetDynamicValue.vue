<script setup lang="ts">
  import { GamecoreTask, 
    GamecoreTargetType,
    DynamicExpression, 
  } from '@/sources/gamecore';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    DynamicKey:string
    Value?:DynamicExpression
  }

  if (node.DynamicKey)
    useHashStore().register(node.DynamicKey, true)
</script>

<template>
  <BlockLayout :source="node">

    Set <em>{{ node.DynamicKey }}</em>
    to <em><EvaluateExpression :expression="node.Value" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>