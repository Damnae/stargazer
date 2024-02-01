<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '../AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    DecisionName:string
    ScoreEvaluatorType:string
    ConsiderAxisList:GamecoreTask[]
    RootTask:GamecoreTask
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Decision <em>{{ node.DecisionName }}</em> <span class="minor">({{ node.ScoreEvaluatorType }})</span>
    <template #content>
      <AnyTask v-for="axis in node.ConsiderAxisList" :node="axis" />
      <AnyTask :node="node.RootTask" />
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>