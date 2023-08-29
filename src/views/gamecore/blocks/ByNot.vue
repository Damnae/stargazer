<script setup lang="ts">
  import { GamecoreNode, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import AnyBlock from '../AnyBlock.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    Predicate:GamecoreNode
  }
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Not</span>
    <template #content>
      <AnyBlock :node="node.Predicate" />
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>