<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    CompareType:string
    CompareValue:{ Value: number }
  }
</script>

<template>
  <BlockLayout :source="node">

    Fail if the value is not <em>{{ node.CompareType }}</em> to <em>{{ node.CompareValue?.Value }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>