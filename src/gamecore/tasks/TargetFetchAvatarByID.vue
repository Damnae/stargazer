<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    AvatarID:number
  }
</script>

<template>
  <BlockLayout :source="node">

    Fetch avatar <em>{{ node.AvatarID }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>