<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TeamType:number
  }
</script>

<template>
  <BlockLayout :source="node">

    Team <em>{{ node.TeamType }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>