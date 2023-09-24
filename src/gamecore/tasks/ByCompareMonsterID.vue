<script setup lang="ts">
  import { GamecoreTask, DynamicExpression, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    TargetMonsterID:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">

    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>
    is monster
    <template v-if="node.TargetMonsterID">
      <em><EvaluateExpression :expression="node.TargetMonsterID" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>