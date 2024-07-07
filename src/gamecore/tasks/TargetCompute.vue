<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ComputeType:string
    Targets:GamecoreTask[]
  }

  const targets = node.Targets;
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Combine the <em>{{ node.ComputeType }}</em> of</span>
    <template #content>
      <AnyTask v-for="n in targets" :node="n" />
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>