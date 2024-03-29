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
    ToTargetType?:GamecoreTargetType
    ToDynamicKey:string
    Property:string
    ContextScope:string
    TargetContextScope:string
  }

  if (node.FromDynamicKey)
    useHashStore().register(node.FromDynamicKey, true)
  if (node.ToDynamicKey)
    useHashStore().register(node.ToDynamicKey, true)
</script>

<template>
  <BlockLayout :source="node">

    Copy 
    <template v-if="node.FromTargetType">
      <em><EvaluateTargetType :target="node.FromTargetType" /></em>'s
    </template>
    <em v-if="node.TargetContextScope">{{ node.TargetContextScope }}.</em><em>{{ node.FromDynamicKey }}</em>
    to 
    <template v-if="node.ToTargetType">
      <em><EvaluateTargetType :target="node.ToTargetType" /></em>'s
    </template>
    <em v-if="node.ContextScope">{{ node.ContextScope }}.</em><em>{{ node.ToDynamicKey }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>