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
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Wait for</span>
    <template #content>
      <AnyTask :node="node.Predicate" />
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>