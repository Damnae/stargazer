<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    NotifyTypeName:string
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    
    Notify UI of <em>{{ node.NotifyTypeName }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>