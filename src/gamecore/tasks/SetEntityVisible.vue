<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    Visible?:boolean
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    
    {{ node.Visible ? 'Show' : 'Hide' }} entity <em><EvaluateTargetType :target="node.TargetType" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>