<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import DynamicKey from '@/gamecore/DynamicKey.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    DynamicKey:string
    ContextScope:string
  }
</script>

<template>
  <BlockLayout :source="node">

    Set <DynamicKey :dynamicKey="node.DynamicKey" :contextScope="node.ContextScope" /> to the change in energy

  </BlockLayout>
</template>

<style scoped>
</style>