<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    CustomString:
    {
      Value:string
    }
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Trigger <em>{{ node.CustomString.Value }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>