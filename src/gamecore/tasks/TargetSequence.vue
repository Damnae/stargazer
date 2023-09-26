<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Sequence:GamecoreTask[]
  }

  const sequence = node.Sequence;
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Sequence</span>
    <template #content>
      <AnyTask v-for="n in sequence" :node="n" />
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>