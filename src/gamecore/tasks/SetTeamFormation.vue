<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Team:string
    FormationType:string
    CustomFormationName:string
  }

</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    Change <em>{{ node.Team }}</em>'s formation to <em>{{ node.FormationType ?? node.CustomFormationName }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>