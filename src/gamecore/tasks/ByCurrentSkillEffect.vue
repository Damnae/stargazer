<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    SkillEffectList:string[]
  }
</script>

<template>
  <BlockLayout :source="node">

    Current skill effect
    is <em>{{ node.SkillEffectList.join(', ') }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>