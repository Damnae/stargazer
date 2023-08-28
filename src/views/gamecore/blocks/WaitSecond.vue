<script setup lang="ts">
  import { AbilityContext, } from '@/scripts/sources/ability';
  import { GamecoreNode, } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode, abilityContext:AbilityContext}>()
  const node = props.node as unknown as 
  {
    WaitTime:number
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    Wait for 
    <em>{{ node.WaitTime }}</em> seconds
  </BlockLayout>
</template>

<style scoped>
</style>