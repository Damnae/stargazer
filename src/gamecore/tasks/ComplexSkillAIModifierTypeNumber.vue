<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ModifierType:string
    IsTarget:boolean
  }
</script>

<template>
  <BlockLayout :source="node">

    {{ node.IsTarget === false ? "Source" : "Target" }}'s status count of type <em>{{ node.ModifierType }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>