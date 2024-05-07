<script setup lang="ts">
  import { Ref, inject, watch, ref } from 'vue';
  import useHashStore from '@/common/hashstore';
  import { DynamicExpression, ExpressionContext, GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import { TaskContext, TaskListTemplate, findTaskTemplate, } from '@/sources/ability';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import AnyTask from '../AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Templates:
    [
      {
        Name:string
        BaseDelay:DynamicExpression
        DelayInterval:DynamicExpression
        ParallelCount:DynamicExpression
      }
    ]
    DynamicValues:
    {
      [key:string]:DynamicExpression
    }
  }

  const expressionContext = inject('expressionContext') as Ref<ExpressionContext>
  const taskContext = inject('taskContext') as Ref<TaskContext>

  const taskTemplates = ref<(TaskListTemplate|undefined)[]>([])
  watch([expressionContext, taskContext], () =>
  {
    taskTemplates.value = node.Templates
      .map(t => findTaskTemplate(t.Name, expressionContext.value, taskContext.value))
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
      Trigger parallel task list templates
    </span>
    <template #content>
      <template v-if="node.DynamicValues != undefined" v-for="dynamicValue, dynamicValueName in node.DynamicValues">
        <BlockLayout :source="dynamicValue">
          With <em>{{ dynamicValueName }}</em> set to <em><EvaluateExpression :expression="dynamicValue" /></em>
        </BlockLayout>
      </template>
      <template v-for="template, templateIndex in node.Templates">
        <BlockLayout :source="template">
          
          <span class="flow">
            <em>{{ template.Name }}</em>
            <template v-if="template.BaseDelay">
              base delay <em><EvaluateExpression :expression="template.BaseDelay" /></em>
            </template>
            <template v-if="template.DelayInterval">
              delay interval <em><EvaluateExpression :expression="template.DelayInterval" /></em>
            </template>
            <template v-if="template.ParallelCount">
              parallel count <em><EvaluateExpression :expression="template.ParallelCount" /></em>
            </template>
          </span>
          <template #content>
            <template v-if="taskTemplates[templateIndex]">
              <AnyTask v-for="task in taskTemplates[templateIndex]?.TaskList" :node="task" />
            </template>
            <template v-else>
              <div class="subblock">
                Not found
              </div>
            </template>
          </template>

        </BlockLayout>
      </template>

    </template>
  </BlockLayout>
</template>

<style scoped>
</style>