<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ModifilerName:string
    ValueType:string
    IsTarget:boolean
  }

  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">

    {{ node.IsTarget === false ? "Source" : "Target" }}'s modifier 
    <RouterLink :to="createModifierRoute(node.ModifilerName)">
      <em>{{ node.ModifilerName }}</em>'s
    </RouterLink>
    <em>{{ node.ValueType ?? "Count" }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>