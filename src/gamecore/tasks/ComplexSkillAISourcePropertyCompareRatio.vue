<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    PropertyTypeA:string
    FromTargetA:boolean
    PropertyTypeB:string
    FromTargetB:boolean
  }
</script>

<template>
  <BlockLayout :source="node">

    {{ node.FromTargetA !== false ? "Target" : "Source" }}'s <em>{{ node.PropertyTypeA }}</em> / {{ node.FromTargetB !== false ? "Target" : "Source" }}'s <em>{{ node.PropertyTypeB }}</em> ratio

  </BlockLayout>
</template>

<style scoped>
</style>