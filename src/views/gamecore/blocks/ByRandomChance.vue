<script setup lang="ts">
  import { Ref, inject } from 'vue';
  import { GamecoreNode, GamecoreContext, 
    DynamicExpression, evaluateDynamicExpression, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    Chance:DynamicExpression
  }
  const gamecoreContext = inject('gamecoreContext') as Ref<GamecoreContext>
</script>

<template>
  <BlockLayout :source="node">
    <em>{{ evaluateDynamicExpression(node.Chance, gamecoreContext) }}</em>% chance
  </BlockLayout>
</template>

<style scoped>
</style>