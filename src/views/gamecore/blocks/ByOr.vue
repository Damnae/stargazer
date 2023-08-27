<script setup lang="ts">
  import { AbilityContext, } from '@/scripts/sources/ability';
  import { GamecoreNode, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import AnyBlock from '../AnyBlock.vue';

  const props = defineProps<{node:GamecoreNode, abilityContext:AbilityContext}>()
  const node = props.node as unknown as 
  {
    PredicateList:GamecoreNode[]
  }
</script>

<template>
  <BlockLayout :node="node">
    <span class="flow">Any</span>
    <template #content>
      <AnyBlock v-for="predicate in node.PredicateList" :node="predicate" :abilityContext="abilityContext" />
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>