<script setup lang="ts">
  import { GamecoreTask, 
    DynamicExpression, 
  } from '@/sources/gamecore';
  import AnyTask from '../AnyTask.vue';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    OddsList:DynamicExpression[]
    TaskList:GamecoreTask[]
  }
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Random</span>
    <template #content>
      <template v-for="task, index in node.TaskList">
        <span class="flow"><em><EvaluateExpression :expression="node.OddsList[index]" /></em>×</span>
        <AnyTask :node="task" />
      </template>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>