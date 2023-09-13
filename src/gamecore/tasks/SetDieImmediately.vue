<script setup lang="ts">
  import { GamecoreTask, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
  }
</script>

<template>
  <BlockLayout :source="node">
    
    <template v-if="node.TargetType">
      Have <em>{{ evaluateTargetType(node.TargetType) }}</em> die immediately
    </template>
    <template v-else>
      Die immediately
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>