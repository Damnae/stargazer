<script setup lang="ts">
  import { GamecoreNode, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
      Trigger 
      <template v-if="node.TargetType">
        <em>{{ evaluateTargetType(node.TargetType) }}</em>'s 
      </template>
      power bar visual effect

  </BlockLayout>
</template>

<style scoped>
</style>