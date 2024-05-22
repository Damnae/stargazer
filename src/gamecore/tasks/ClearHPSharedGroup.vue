<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    MainTarget?:GamecoreTargetType
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Stop sharing HP 
    <template v-if="node.MainTarget">
      with main target <em><EvaluateTargetType :target="node.MainTarget" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>