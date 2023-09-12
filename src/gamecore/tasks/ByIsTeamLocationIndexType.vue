<script setup lang="ts">
  import { GamecoreTask, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    TeamType:string
    Type:string
  }
</script>

<template>
  <BlockLayout :source="node">

    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>
    </template>
    is located <em>{{ node.Type }}</em> of <em>{{ node.TeamType }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>