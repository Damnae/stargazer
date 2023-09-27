<script setup lang="ts">
  import { cleanupFilename } from '@/common/common';
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    PrefabPath:string
    ConfigPath:string
    MemberName:string
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    Summon <em>{{ cleanupFilename(node.ConfigPath) }}</em> as <em>{{ node.MemberName }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>