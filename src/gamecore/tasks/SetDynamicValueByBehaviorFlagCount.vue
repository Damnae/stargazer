<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import DynamicKey from '@/gamecore/DynamicKey.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ReadTargetType?:GamecoreTargetType
    DynamicKey:string
    ContextScope:string
    BehaviorFlag:string
  }
</script>

<template>
  <BlockLayout :source="node">

    Set <DynamicKey :dynamicKey="node.DynamicKey" :contextScope="node.ContextScope" />

    to 
    <template v-if="node.ReadTargetType">
      <em><EvaluateTargetType :target="node.ReadTargetType" /></em>'s
    </template>
    <em>{{ node.BehaviorFlag }}</em> flag count
    
  </BlockLayout>
</template>

<style scoped>
</style>