<script setup lang="ts">
  import { GamecoreTask, 
    GamecoreTargetType, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    Team:string
  }
</script>

<template>
  <BlockLayout :source="node">
    
    The character taking a turn is part of <em>{{ node.Team }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>