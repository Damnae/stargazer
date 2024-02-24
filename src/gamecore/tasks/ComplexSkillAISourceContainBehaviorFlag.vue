<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    BehaviorFlag:string
    FromTarget:boolean
  }
</script>

<template>
  <BlockLayout :source="node">

    {{ node.FromTarget === false ? "Source" : "Target" }} has flag <em>{{ node.BehaviorFlag }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>