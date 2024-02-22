<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TimeScale:number
    UnscaledDuration:number
    Curve:string
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    
    Change the global animation speed
    <template v-if="node.TimeScale">
      to <em><EvaluateExpression :expression="node.TimeScale" /></em>×
    </template>
    <template v-if="node.UnscaledDuration">
      for <em><EvaluateExpression :expression="node.UnscaledDuration" /></em>s
    </template>
    <template v-if="node.Curve">
      with curve <em>{{ node.Curve }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>