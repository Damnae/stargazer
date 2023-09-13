<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    SkillName:string
    Selector:GamecoreTask
  }
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Select target for skill <em>{{ node.SkillName }}</em></span>
    <template #content>
      
      <AnyTask :node="node.Selector" />

    </template>
  </BlockLayout>
</template>

<style scoped>
</style>