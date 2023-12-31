<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Level?:string
    Message?:string
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    
    {{ node.Message }}

  </BlockLayout>
</template>

<style scoped>
</style>