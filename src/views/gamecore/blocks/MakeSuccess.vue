<script setup lang="ts">
  import { GamecoreNode, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import AnyBlock from '@/views/gamecore/AnyBlock.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    Task:GamecoreNode
  }

</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    <span class="flow">Make success(?)</span>
    <template #content>
      <AnyBlock :node="node.Task" />
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>