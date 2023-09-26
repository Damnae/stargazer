<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    EntityTypeMask?:string
    AliveStateMask?:string
  }
</script>

<template>
  <BlockLayout :source="node">

    Query 
    <template v-if="node.EntityTypeMask">
      by type mask <em>{{ node.EntityTypeMask }}</em>
    </template>
    <template v-if="node.AliveStateMask">
      by alive mask <em>{{ node.AliveStateMask }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>