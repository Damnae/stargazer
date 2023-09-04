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