<script setup lang="ts">
  import { inject, Ref, computed, } from 'vue'
  import { TaskContext, TaskListTemplate, } from '@/sources/ability';
  import AnyTask from '@/gamecore/AnyTask.vue';
  import ShowContext from './components/ShowContext.vue';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{taskTemplateId:string}>()
  const taskContext = inject('taskContext') as Ref<TaskContext>

  const taskTemplate = computed<TaskListTemplate>(() => taskContext.value.TaskListTemplates?.[props.taskTemplateId])
</script>

<template>
  <header>
    <h1><span class="pretitle">Task Template:</span> {{ taskTemplateId }}</h1>
  </header>
  <section :key="taskTemplateId">

      <template v-if="taskTemplate">

        <template v-if="taskTemplate.TaskList">
          <h2>Tasks</h2>
          <template v-for="task in taskTemplate.TaskList">
            <AnyTask :node="task" />
          </template>
        </template>

        <h2>Context</h2>
        <BlockLayout :source="taskTemplate">
          <span class="flow">Task Template Data</span>
        </BlockLayout>
        <ShowContext />

      </template>
      <span v-else class="minor">(Task Template {{ taskTemplateId }} not found)</span>

  </section>
</template>

<style scoped>
</style>