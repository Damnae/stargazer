<script setup lang="ts">
  import { GamecoreTask, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    PerformerType:GamecoreTargetType
    TargetType:string
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    <template v-if="node.PerformerType">
      Have <em>{{ evaluateTargetType(node.PerformerType) }}</em> look
    </template>
    <template v-else>
      Look
    </template>
    at <em>{{ node.TargetType }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>