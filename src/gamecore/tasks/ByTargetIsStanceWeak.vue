<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    AttackerType?:GamecoreTargetType
    TargetType?:GamecoreTargetType
  }
</script>

<template>
  <BlockLayout :source="node">
   
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>
    is weak to
    <template v-if="node.AttackerType">
      <em><EvaluateTargetType :target="node.AttackerType" /></em>'s
    </template>
    element

  </BlockLayout>
</template>

<style scoped>
</style>