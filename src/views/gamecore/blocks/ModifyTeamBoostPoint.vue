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
    ModifyFunction:string
    ModifyValue?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    <em>{{ node.ModifyFunction }} <EvaluateExpression :expression="node.ModifyValue" /></em> skill point

  </BlockLayout>
</template>

<style scoped>
</style>