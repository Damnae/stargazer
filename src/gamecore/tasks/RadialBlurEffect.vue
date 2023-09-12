<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Active:boolean
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    
    {{ node.Active === false ? 'Clear' : 'Apply' }} radial blur effect

  </BlockLayout>
</template>

<style scoped>
</style>