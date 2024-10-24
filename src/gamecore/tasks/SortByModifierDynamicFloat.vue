<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import ModifierLink from '@/gamecore/ModifierLink.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ReadTargetType?:GamecoreTargetType
    ModifierName:string
    DynamicFloatKey:string
  }
  
  if (node.DynamicFloatKey)
    useHashStore().register(node.DynamicFloatKey, true)
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
    <em>{{ node.DynamicFloatKey }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>