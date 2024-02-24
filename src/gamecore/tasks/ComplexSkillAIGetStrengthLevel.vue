<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    IsTarget:boolean
  }
</script>

<template>
  <BlockLayout :source="node">

    {{ node.IsTarget === false ? "Source" : "Target" }}'s strength level

  </BlockLayout>
</template>

<style scoped>
</style>