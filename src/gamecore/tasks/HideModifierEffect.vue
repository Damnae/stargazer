<script setup lang="ts">
  import { GamecoreTask, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    EventType?:string
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    
    Hide modifier visual effects on <em>{{ evaluateTargetType(node.TargetType) }}</em>
    <template v-if="node.EventType">
      for event <em>{{ node.EventType }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>