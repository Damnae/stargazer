<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    PropertyStrategy:string
    Property:string
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Has <em>{{ node.PropertyStrategy }}</em> in <em>{{ node.Property }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>