<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    SoundName:string
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    
    Play sound <em>{{ node.SoundName }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>