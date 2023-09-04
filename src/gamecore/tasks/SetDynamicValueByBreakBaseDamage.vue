<script setup lang="ts">
  import { GamecoreTask, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/sources/gamecore';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ReadTargetType?:GamecoreTargetType
    DynamicKey:string
  }

  if (node.DynamicKey)
    useHashStore().register(node.DynamicKey, true)
</script>

<template>
  <BlockLayout :source="node">

    Set <em>{{ node.DynamicKey }}</em>

    to 
    <template v-if="node.ReadTargetType">
      <em>{{ evaluateTargetType(node.ReadTargetType) }}</em>'s
    </template>
    base break damage
  </BlockLayout>
</template>

<style scoped>
</style>