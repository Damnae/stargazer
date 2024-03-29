<script setup lang="ts">
  import { Ref, inject, watch, ref } from 'vue';
  import useHashStore from '@/common/hashstore';
  import { DynamicExpression, ExpressionContext, GamecoreTargetType, GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import { TaskContext, TaskListTemplate, findTaskTemplate, } from '@/sources/ability';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import AnyTask from '../AnyTask.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Name:string
    ParamTarget:GamecoreTargetType
    DynamicValues:
    {
      [key:string]: DynamicExpression
    }
  }

  const expressionContext = inject('expressionContext') as Ref<ExpressionContext>
  const taskContext = inject('taskContext') as Ref<TaskContext>

  const taskTemplate = ref<TaskListTemplate>()
  watch([expressionContext, taskContext], () =>
  {
    taskTemplate.value = findTaskTemplate(node.Name, expressionContext.value, taskContext.value)
  },
  { immediate:true })

  if (node.DynamicValues)
  {
    const hashStore = useHashStore()
    for (const key of Object.keys(node.DynamicValues))
      hashStore.register(key, false)
    hashStore.commit()
  }
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">
      Include task list template 
      <em>{{ node.Name }}</em>
      <template v-if="node.ParamTarget">
        with target <em><EvaluateTargetType :target="node.ParamTarget" /></em>
      </template>
    </span>
    <template #content>

      <template v-if="node.DynamicValues != undefined" v-for="dynamicValue, dynamicValueName in node.DynamicValues">
        <BlockLayout :source="dynamicValue">
          With <em>{{ dynamicValueName }}</em> set to <em><EvaluateExpression :expression="dynamicValue" /></em>
        </BlockLayout>
      </template>

      <template v-if="taskTemplate">
        <AnyTask v-for="task in taskTemplate.TaskList" :node="task" />
      </template>
      <template v-else>
        <div class="subblock">
          Not found
        </div>
      </template>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>