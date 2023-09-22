<script setup lang="ts">
  import { GamecoreTask, 
    GamecoreTargetType, evaluateTargetType,
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    LockKey:string
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Unlock 
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s
    </template>
    HP with key <em>{{ node.LockKey }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>