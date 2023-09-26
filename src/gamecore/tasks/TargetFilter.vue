<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Predicate:GamecoreTask
  }

  const predicate = node.Predicate;
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Filter by</span>
    <template #content>
      <AnyTask :node="predicate" />
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>