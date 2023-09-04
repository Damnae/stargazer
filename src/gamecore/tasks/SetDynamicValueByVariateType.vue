<script setup lang="ts">
  import { GamecoreTask, 
    GamecoreTargetType,
  } from '@/sources/gamecore';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
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