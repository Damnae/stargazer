<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    Reset the animation speed 
    <template v-if="node.TargetType">
      of <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>