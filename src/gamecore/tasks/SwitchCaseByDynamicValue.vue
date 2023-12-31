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
    Switch:DynamicExpression
    CaseTaskList:
    {
      Case:DynamicExpression
      TaskList:GamecoreTask[]
    }[]
  }
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Switch <em><EvaluateExpression :expression="node.Switch" /></em></span>
    <template #content>
      <div class="subblock">
        <template v-for="caseTask in node.CaseTaskList">
          <span class="flow"><em><EvaluateExpression :expression="caseTask.Case" /></em>:</span>
          <template v-for="task in caseTask.TaskList">
            <AnyTask :node="task" />
          </template>
        </template>
      </div>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>