<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreNode, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ModifierName:string
  }
  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">

    <em>{{ evaluateTargetType(node.TargetType) }}</em>
    has modifier
    <RouterLink v-if="node.ModifierName" :to="createModifierRoute(node.ModifierName)">
      <em>{{ node.ModifierName }}</em>
    </RouterLink>

  </BlockLayout>
</template>

<style scoped>
</style>