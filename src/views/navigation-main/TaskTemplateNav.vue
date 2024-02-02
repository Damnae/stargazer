<script setup lang="ts">
  import { ref, computed, inject, Ref, } from 'vue'
  import { RouterLink } from 'vue-router';
  import { TaskContext, TaskContextType, getTaskContext, TaskListTemplate } from '@/sources/ability';
  import NavItem from '@/components/NavItem.vue'

  const commitId = inject<string>('commitId') as string
  const search = inject<Ref<string>>('search') as Ref<string>
    
  const taskContext = ref<TaskContext>(await getTaskContext(commitId, TaskContextType.TaskTemplate))
  const taskTemplatesSearchResults = computed(() => allTaskTemplates())

  function allTaskTemplates() : TaskListTemplate[]
  {
    return Object.values(taskContext.value.TaskListTemplates)
      .filter(v => v.Name.toLowerCase().includes(search.value.toLowerCase()))
      .sort((a, b) => a.Name > b.Name ? 1 : -1)
  }
</script>

<template>
  <NavItem v-for="taskTemplate in taskTemplatesSearchResults" :key="taskTemplate.Name">
    <RouterLink :to="{ name:'tasktemplate', params:{ commitId: commitId, taskTemplateId: taskTemplate.Name }}">
      <span :title="taskTemplate.Name">{{ taskTemplate.Name }}</span>
    </RouterLink>
  </NavItem>
</template>

<style scoped>
</style>