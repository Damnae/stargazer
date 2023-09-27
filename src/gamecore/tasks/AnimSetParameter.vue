<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ParameterName?:string
    ParameterType?:string
    Value?:string
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    Change animation parameter <em>{{ node.ParameterName }}</em> to <em>{{ node.Value }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>