<script setup lang="ts">
  import { GamecoreNode, 
    DynamicExpression, 
  } from '@/scripts/sources/gamecore';
  import AnyBlock from '../AnyBlock.vue';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    OddsList:DynamicExpression[]
    TaskList:GamecoreNode[]
  }
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Random</span>
    <template #content>
      <template v-for="task, index in node.TaskList">
        <span class="flow"><em><EvaluateExpression :expression="node.OddsList[index]" /></em>×</span>
        <AnyBlock :node="task" />
      </template>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>