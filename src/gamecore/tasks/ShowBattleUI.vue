<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    IsShow:boolean
  }

</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    {{ node.IsShow ? 'Show' : 'Hide' }} the combat UI

  </BlockLayout>
</template>

<style scoped>
</style>