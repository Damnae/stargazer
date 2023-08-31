<script setup lang="ts">
  import { GamecoreNode, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    Visible?:boolean
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    {{ node.Visible ? 'Show' : 'Hide' }}
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s 
    </template>
    character HUD

  </BlockLayout>
</template>

<style scoped>
</style>