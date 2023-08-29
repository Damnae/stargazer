<script setup lang="ts">
  import { GamecoreNode, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import AnyBlock from '../AnyBlock.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    PredicateList:GamecoreNode[]
  }
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Any</span>
    <template #content>
      <AnyBlock v-for="predicate in node.PredicateList" :node="predicate" />
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>