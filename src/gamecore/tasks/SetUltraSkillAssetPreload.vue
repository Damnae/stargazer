<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    SkillName:string
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    
    Preload assets for <em>{{ node.SkillName }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>