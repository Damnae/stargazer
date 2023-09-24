<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    TimeScale:number
    UnscaledDuration:number
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    
    Change the animation speed of 
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s
    </template>
    <template v-if="node.TimeScale">
      to <em>{{ node.TimeScale }}</em>×
    </template>
    <template v-if="node.UnscaledDuration">
      for <em>{{ node.UnscaledDuration }}</em>s
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>