<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '../AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    DecisionName:string
    RootTask:GamecoreTask
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Decision <em>{{ node.DecisionName }}</em>
    <template #content>
      <AnyTask :node="node.RootTask" />
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>