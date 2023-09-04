<script setup lang="ts">
  import { GamecoreTask, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    Flag:string
  }
</script>

<template>
  <BlockLayout :source="node">

    <em>{{ evaluateTargetType(node.TargetType) }}</em>
    has <em>{{ node.Flag }}</em> flag

  </BlockLayout>
</template>

<style scoped>
</style>