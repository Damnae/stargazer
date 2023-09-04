<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '../AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    PredicateList:GamecoreTask[]
  }
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Any</span>
    <template #content>
      <AnyTask v-for="predicate in node.PredicateList" :node="predicate" />
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>