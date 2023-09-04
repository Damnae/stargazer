<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
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