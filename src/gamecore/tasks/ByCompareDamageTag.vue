<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    DamageTagList:string[]
  }
</script>

<template>
  <BlockLayout :source="node">

    Damage has tag <em>{{ node.DamageTagList.join(', ') }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>