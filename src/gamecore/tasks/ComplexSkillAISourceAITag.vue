<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    DynamicValueKey:string
    IsTarget:boolean
  }

  if (node.DynamicValueKey)
    useHashStore().register(node.DynamicValueKey, true)
</script>

<template>
  <BlockLayout :source="node">

    {{ node.IsTarget === false ? "Source" : "Target" }}'s AI tag <em>{{ node.DynamicValueKey }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>