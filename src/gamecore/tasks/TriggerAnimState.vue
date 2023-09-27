<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    AnimLogicState?:string
    AnimStateName?:string
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    Play
    <template v-if="node.TargetType">
      <EvaluateTargetType :target="node.TargetType" />'s 
    </template>
    <em>{{ node.AnimLogicState }}</em> / <em>{{ node.AnimStateName }}</em>
    animation

  </BlockLayout>
</template>

<style scoped>
</style>