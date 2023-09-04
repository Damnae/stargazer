<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Task:GamecoreTask
  }

</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    <span class="flow">Make success(?)</span>
    <template #content>
      <AnyTask :node="node.Task" />
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>