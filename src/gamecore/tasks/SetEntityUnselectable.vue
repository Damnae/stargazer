<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    Unselectable?:boolean
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Make <em><EvaluateTargetType :target="node.TargetType" /></em>
    {{ node.Unselectable ? "unselectable" : "selectable" }}

  </BlockLayout>
</template>

<style scoped>
</style>