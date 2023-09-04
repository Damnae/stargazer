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