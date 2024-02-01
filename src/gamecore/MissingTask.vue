<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import { cleanupTaskName, } from '@/common/common';
  import BlockLayout from '@/components/BlockLayout.vue';

  defineProps<{node:GamecoreTask}>()
</script>

<template>
  <BlockLayout :source="node">
    <span class="notimplemented">{{ cleanupTaskName(node?.$type ?? "No Task") }}</span>
  </BlockLayout>
</template>

<style scoped>
</style>