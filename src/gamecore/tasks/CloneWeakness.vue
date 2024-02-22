<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    SourceType?:GamecoreTargetType
    TargetType?:GamecoreTargetType
  }
</script>

<template>
  <BlockLayout :source="node">
   
    Clone weaknesses
    <template v-if="node.SourceType">
      from <em><EvaluateTargetType :target="node.SourceType" /></em>
    </template>
    <template v-if="node.TargetType">
      to <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>