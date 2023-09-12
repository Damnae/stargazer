<script setup lang="ts">
  import { GamecoreTask, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    Visible?:boolean
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    
    {{ node.Visible ? 'Show' : 'Hide' }} entity <em>{{ evaluateTargetType(node.TargetType) }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>