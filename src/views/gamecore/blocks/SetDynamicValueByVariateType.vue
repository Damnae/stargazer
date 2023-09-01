<script setup lang="ts">
  import { GamecoreNode, 
    GamecoreTargetType,
  } from '@/scripts/sources/gamecore';
  import useHashStore from '@/scripts/hashstore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    DynamicKey:string
    VariateType?:string
  }

  if (node.DynamicKey)
    useHashStore().register(node.DynamicKey, true)
</script>

<template>
  <BlockLayout :source="node">

    Set <em>{{ node.DynamicKey }}</em>
    to <em>{{ node.VariateType }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>