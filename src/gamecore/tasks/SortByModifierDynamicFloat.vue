<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import ModifierLink from '@/gamecore/ModifierLink.vue';
  import DynamicKey from '@/gamecore/DynamicKey.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ReadTargetType?:GamecoreTargetType
    ModifierName:string
    DynamicFloatKey:string
    ContextScope:string
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Sorted by
    <template v-if="node.ModifierName">
      <ModifierLink :modifierName="node.ModifierName" />'s
    </template>
    <template v-else>
      this modifier's
    </template>
    <DynamicKey :dynamicKey="node.DynamicFloatKey" :contextScope="node.ContextScope" />

  </BlockLayout>
</template>

<style scoped>
</style>