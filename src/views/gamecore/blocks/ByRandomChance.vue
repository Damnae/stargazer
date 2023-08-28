<script setup lang="ts">
  import { AbilityContext, } from '@/scripts/sources/ability';
  import { GamecoreNode, 
    DynamicExpression, evaluateDynamicExpression, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode, abilityContext:AbilityContext}>()
  const node = props.node as unknown as 
  {
    Chance:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    <em>{{ evaluateDynamicExpression(node.Chance) }}</em>% chance
  </BlockLayout>
</template>

<style scoped>
</style>