<script setup lang="ts">
  import { GamecoreNode, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    SkillType:string
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Current skill type is <em>{{ node.SkillType ?? 'Basic ATK' }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>