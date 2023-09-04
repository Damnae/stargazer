<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    PointTriggerKey:
    {
      Hash:number
    }
  }

  let traceName = node.PointTriggerKey?.Hash.toString();
  switch (node.PointTriggerKey.Hash)
  {
    case 1455742903: traceName = 'A2'; break;
    case 1455742904: traceName = 'A4'; break;
    case 1455742905: traceName = 'A6'; break;
  }
</script>

<template>
  <BlockLayout :source="node">
    Has trace <em>{{ traceName }}</em>
  </BlockLayout>
</template>

<style scoped>
</style>