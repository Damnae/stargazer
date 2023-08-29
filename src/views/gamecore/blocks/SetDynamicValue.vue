<script setup lang="ts">
  import { GamecoreNode, 
    GamecoreTargetType,
    DynamicExpression, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    DynamicKey:string
    Value?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">

    Set <em>{{ node.DynamicKey }}</em>
    to <em><EvaluateExpression :expression="node.Value" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>