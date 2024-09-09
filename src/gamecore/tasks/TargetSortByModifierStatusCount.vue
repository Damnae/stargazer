<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    HighestFirst?:boolean
    BuffStatus:string
  }
</script>

<template>
  <BlockLayout :source="node">

    Sort by <em>{{ node.BuffStatus }}</em> count
    <span class="minor">({{ node.HighestFirst ? 'Highest' : 'Lowest' }} first)</span>

  </BlockLayout>
</template>

<style scoped>
</style>