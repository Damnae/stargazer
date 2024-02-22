<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ReadTargetType?:GamecoreTargetType
    ModifierName:string
    DynamicFloatKey:string
  }
  
  if (node.DynamicFloatKey)
    useHashStore().register(node.DynamicFloatKey, true)

  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">
    
    Sorted by
    <RouterLink v-if="node.ModifierName" :to="createModifierRoute(node.ModifierName)">
      <em>{{ node.ModifierName }}</em>'s
    </RouterLink>
    <template v-else>
      this modifier's
    </template>
    <em>{{ node.DynamicFloatKey }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>