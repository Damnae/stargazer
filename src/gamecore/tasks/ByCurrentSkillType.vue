<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    SkillType:string
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Current skill type is <em>{{ node.SkillType ?? 'Normal' }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>