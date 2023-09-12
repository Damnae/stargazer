<script setup lang="ts">
  import { GamecoreTask, 
    DynamicExpression,
    GamecoreTargetType, evaluateTargetType, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    TargetCharacterID:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">

    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>
    </template>
    is character
    <template v-if="node.TargetCharacterID">
      <em><EvaluateExpression :expression="node.TargetCharacterID" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>