<script setup lang="ts">
  import { GamecoreNode, 
    GamecoreTargetType, evaluateTargetType, 
    DynamicExpression,
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ModifierName:string
    Value?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">

    Set 
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s
    </template>
    <RouterLink :to="{  }">
      <em>{{ node.ModifierName }}</em>
    </RouterLink>'s
    value to <em><EvaluateExpression :expression="node.Value" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>