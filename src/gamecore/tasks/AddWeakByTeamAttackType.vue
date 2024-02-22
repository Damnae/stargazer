<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ResistanceDeltaValue?:DynamicExpression
    AddWeakCountMax?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Add 
    <template v-if="node.AddWeakCountMax">
      up to <em><EvaluateExpression :expression="node.AddWeakCountMax" /></em>
    </template>
    weakness based on team elements 
    <template v-if="node.TargetType">
      to <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>
    <template v-if="node.ResistanceDeltaValue">
      modifying corresponding RES by <em><EvaluateExpression :expression="node.ResistanceDeltaValue" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>