<script setup lang="ts">
  import { GamecoreNode, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    ReadTargetType?:GamecoreTargetType
    DynamicKey:string
    Value?:string
  }
</script>

<template>
  <BlockLayout :source="node">

    Set <em>{{ node.DynamicKey }}</em>

    to 
    <template v-if="node.ReadTargetType">
      <em>{{ evaluateTargetType(node.ReadTargetType) }}</em>'s
    </template>
    <em>{{ node.Value }}</em>
  </BlockLayout>
</template>

<style scoped>
</style>