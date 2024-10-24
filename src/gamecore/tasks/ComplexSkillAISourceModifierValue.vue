<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import ModifierLink from '@/gamecore/ModifierLink.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ModifilerName:string
    ValueType:string
    IsTarget:boolean
  }
</script>

<template>
  <BlockLayout :source="node">

    {{ node.IsTarget === false ? "Source" : "Target" }}'s modifier 
    <template v-if="node.ModifilerName">
      <ModifierLink :modifierName="node.ModifilerName" />'s
    </template>
    <em>{{ node.ValueType ?? "Count" }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>