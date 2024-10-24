<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import ModifierLink from '../ModifierLink.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ModifilerName:string
    IsTarget:boolean
  }
</script>

<template>
  <BlockLayout :source="node">

    {{ node.IsTarget === false ? "Source" : "Target" }} has modifier 
    <ModifierLink :modifierName="node.ModifilerName" />

  </BlockLayout>
</template>

<style scoped>
</style>