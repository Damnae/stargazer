<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    HighestFirst?:boolean
    MaxRank:string
  }
</script>

<template>
  <BlockLayout :source="node">

    Sort by monster rank 
    <template v-if="node.MaxRank">
      up to <em>{{ node.MaxRank }}</em>
    </template>
    
    <span class="minor">({{ node.HighestFirst ? 'Highest' : 'Lowest' }} first)</span>

  </BlockLayout>
</template>

<style scoped>
</style>