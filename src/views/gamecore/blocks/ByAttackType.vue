<script setup lang="ts">
  import { GamecoreNode, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    AttackTypes:string[]
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Attack type is <em>{{ node.AttackTypes.join(', ') }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>