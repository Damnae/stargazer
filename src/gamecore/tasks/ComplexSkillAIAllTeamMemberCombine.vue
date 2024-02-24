<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Evaluator:GamecoreTask
    TeamType:string
    ListCombineType:string
  }
</script>

<template>
  <BlockLayout :source="node">

    <span class="flow">Take the <em>{{ node.ListCombineType ?? "Add" }}</em> in <em>{{ node.TeamType }}</em></span>
    <template #content>
      <AnyTask :node="node.Evaluator" />
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>