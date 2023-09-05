<script setup lang="ts">
  import { GamecoreTask, 
    GamecoreTargetType,
evaluateTargetType,
  } from '@/sources/gamecore';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '../AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ReadTargetType?:GamecoreTargetType
    DynamicKey:string
    Predicate?:GamecoreTask
  }

  if (node.DynamicKey)
    useHashStore().register(node.DynamicKey, true)
</script>

<template>
  <BlockLayout :source="node">

    Set <em>{{ node.DynamicKey }}</em>
    to the character count 
    <template v-if="node.ReadTargetType">
      in <em>{{ evaluateTargetType(node.ReadTargetType) }}</em>
    </template>
    <template #content v-if="node.Predicate">
      <span class="flow">With condition</span>
      <AnyTask :node="node.Predicate" />
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>