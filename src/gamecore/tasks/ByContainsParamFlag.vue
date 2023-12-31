<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Flag:string
  }
</script>

<template>
  <BlockLayout :source="node">

    Has <em>{{ node.Flag }}</em> flag

  </BlockLayout>
</template>

<style scoped>
</style>