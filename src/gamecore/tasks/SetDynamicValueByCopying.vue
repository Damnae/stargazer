<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import DynamicKey from '@/gamecore/DynamicKey.vue';

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
</script>

<template>
  <BlockLayout :source="node">

    Copy 
    <template v-if="node.FromTargetType">
      <em><EvaluateTargetType :target="node.FromTargetType" /></em>'s
    </template>
    <DynamicKey :dynamicKey="node.FromDynamicKey" :contextScope="node.TargetContextScope" />
    to 
    <template v-if="node.ToTargetType">
      <em><EvaluateTargetType :target="node.ToTargetType" /></em>'s
    </template>
    <DynamicKey :dynamicKey="node.ToDynamicKey" :contextScope="node.ContextScope" />

  </BlockLayout>
</template>

<style scoped>
</style>