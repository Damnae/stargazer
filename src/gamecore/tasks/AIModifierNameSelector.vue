<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import ModifierLink from '@/gamecore/ModifierLink.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ModifierName:string
  }
</script>

<template>
  <BlockLayout :source="node">

    Has modifier
    <ModifierLink :modifierName="node.ModifierName" />

  </BlockLayout>
</template>

<style scoped>
</style>