<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Name:string
  }
</script>

<template>
  <BlockLayout :source="node">

  <template v-if="node.Name">
    Fetch partner <em>{{ node.Name }}</em>
  </template>
  <template v-else>
    Fetch partners
  </template>

  </BlockLayout>
</template>

<style scoped>
</style>