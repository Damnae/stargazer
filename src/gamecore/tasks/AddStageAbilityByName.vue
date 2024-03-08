<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    StageAbilityName:string
  }

  const createAbilityRoute = inject<(key:string) => object>('createAbilityRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">
   
    Add ability
    <RouterLink :to="createAbilityRoute(node.StageAbilityName)">
      <em>{{ node.StageAbilityName }}</em>
    </RouterLink>
    to the stage

  </BlockLayout>
</template>

<style scoped>
</style>