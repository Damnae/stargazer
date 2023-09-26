<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    PropertyType:string
    HighestFirst?:boolean
  }
</script>

<template>
  <BlockLayout :source="node">

    Sort by <em>{{ node.PropertyType }}</em>
    <span class="minor">({{ node.HighestFirst ? 'Highest' : 'Lowest' }} first)</span>

  </BlockLayout>
</template>

<style scoped>
</style>