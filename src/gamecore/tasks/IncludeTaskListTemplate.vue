<script setup lang="ts">
  import { Ref, inject, watch, ref } from 'vue';
  import { ExpressionContext, GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import { TaskContext, TaskListTemplate, findTaskTemplate, } from '@/sources/ability';
  import AnyTask from '../AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Name:string
  }

  const expressionContext = inject('expressionContext') as Ref<ExpressionContext>
  const taskContext = inject('taskContext') as Ref<TaskContext>

  const taskTemplate = ref<TaskListTemplate>()
  watch([expressionContext, taskContext], () =>
  {
    taskTemplate.value = findTaskTemplate(node.Name, expressionContext.value, taskContext.value)
  },
  { immediate:true })
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">
      Include task list template 
      <em>{{ node.Name }}</em>
    </span>
    <template #content v-if="taskTemplate">
      <AnyTask v-for="task in taskTemplate.TaskList" :node="task" />
    </template>
    <template #content v-else>
      <div class="subblock">
        Not found
      </div>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>