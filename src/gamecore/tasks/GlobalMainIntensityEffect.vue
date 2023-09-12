<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    IsRevert:boolean
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    
    {{ node.IsRevert ? 'Clear' : 'Apply' }} intensity effect

  </BlockLayout>
</template>

<style scoped>
</style>