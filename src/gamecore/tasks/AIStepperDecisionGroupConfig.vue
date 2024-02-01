<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '../AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    DecisionGroupName:string
    DecisionList:GamecoreTask[]
  }
</script>

<template>
  <BlockLayout :source="node">
    
    <span class="flow">Group <em>{{ node.DecisionGroupName }}</em></span>
    <template #content>
      <AnyTask v-for="decision in node.DecisionList" :node="decision" />
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>