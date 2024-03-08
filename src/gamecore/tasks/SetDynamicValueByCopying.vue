<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    FromTargetType?:GamecoreTargetType
    FromDynamicKey:string
    ToDynamicKey:string
    Property:string
  }

  if (node.FromDynamicKey)
    useHashStore().register(node.FromDynamicKey, true)
  if (node.ToDynamicKey)
    useHashStore().register(node.ToDynamicKey, true)
</script>

<template>
  <BlockLayout :source="node">

    Set <em>{{ node.ToDynamicKey }}</em>
    to 
    <template v-if="node.FromTargetType">
      <em><EvaluateTargetType :target="node.FromTargetType" /></em>'s
    </template>
    <em>{{ node.FromDynamicKey }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>