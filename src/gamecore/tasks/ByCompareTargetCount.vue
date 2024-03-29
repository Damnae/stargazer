<script setup lang="ts">
  import { GamecoreTask, DynamicExpression, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    CompareType:string
    Number:DynamicExpression
    AliveOnly?:boolean
  }
</script>

<template>
  <BlockLayout :source="node">
    
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>
    contains
    <template v-if="node.CompareType">
      <em>{{ node.CompareType }}</em> to
    </template>
    <template v-if="node.Number">
      <em><EvaluateExpression :expression="node.Number" /></em>
    </template>
    {{ node.AliveOnly ? 'alive' : '' }} targets

  </BlockLayout>
</template>

<style scoped>
</style>