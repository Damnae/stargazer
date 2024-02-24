<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ValueType:string
    OverrideRange:boolean
    OverrideMin:number
    OverrideMax:number
    IsTarget:boolean
  }
</script>

<template>
  <BlockLayout :source="node">

    {{ node.IsTarget === false ? "Source" : "Target" }}'s <em>{{ node.ValueType }}</em> in team ratio

  </BlockLayout>
</template>

<style scoped>
</style>