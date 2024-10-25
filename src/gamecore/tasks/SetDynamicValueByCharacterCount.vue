<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import AnyTask from '../AnyTask.vue';
  import DynamicKey from '@/gamecore/DynamicKey.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ReadTargetType?:GamecoreTargetType
    DynamicKey:string
    ContextScope:string
    Predicate?:GamecoreTask
    AliveOnly?:boolean
  }
</script>

<template>
  <BlockLayout :source="node">

    Set <DynamicKey :dynamicKey="node.DynamicKey" :contextScope="node.ContextScope" />
    to the {{ node.AliveOnly ? 'alive' : '' }} character count 
    <template v-if="node.ReadTargetType">
      in <em><EvaluateTargetType :target="node.ReadTargetType" /></em>
    </template>
    <template #content v-if="node.Predicate">
      <span class="flow">With condition</span>
      <AnyTask :node="node.Predicate" />
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>