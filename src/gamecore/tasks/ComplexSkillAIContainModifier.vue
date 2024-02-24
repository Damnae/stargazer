<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ModifilerName:string
    IsTarget:boolean
  }

  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">

    {{ node.IsTarget === false ? "Source" : "Target" }} has modifier 
    <RouterLink :to="createModifierRoute(node.ModifilerName)">
      <em>{{ node.ModifilerName }}</em>
    </RouterLink>

  </BlockLayout>
</template>

<style scoped>
</style>