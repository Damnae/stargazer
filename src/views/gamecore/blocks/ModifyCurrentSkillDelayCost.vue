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
    NormalizedValue?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    <em v-if="node.ModifyFunction">{{ node.ModifyFunction }}</em> 
    <template v-else>Modifiy</template> 
    
    current skill action delay cost
    <template v-if="node.NormalizedValue">
      to <em><EvaluateExpression :expression="node.NormalizedValue" /></em>×
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>