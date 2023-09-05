<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    IsHide:boolean
  }

</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    {{ node.IsHide ? 'Hide' : 'Show' }} the stage

  </BlockLayout>
</template>

<style scoped>
</style>