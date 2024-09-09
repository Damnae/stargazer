<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    EntityTypeMask?:string
  }
</script>

<template>
  <BlockLayout :source="node">
    
    <em><EvaluateTargetType :target="node.TargetType" /></em>'s entity type is <em>{{ node.EntityTypeMask }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>