<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AbilityLink from '../AbilityLink.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    AbilityName:string
  }
</script>

<template>
  <BlockLayout :source="node">
   
    Add ability
    <AbilityLink :abilityName="node.AbilityName" />
    to the ability owner

  </BlockLayout>
</template>

<style scoped>
</style>