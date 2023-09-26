<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    MonsterID:number
  }
</script>

<template>
  <BlockLayout :source="node">

    Fetch monster <em>{{ node.MonsterID }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>