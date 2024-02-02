<script setup lang="ts">
  import ProvideTaskTemplateContext from './components/ProvideTaskTemplateContext.vue';
  import TaskTemplate from './TaskTemplate.vue';

  defineProps<{commitId:string, taskTemplateId:string}>()
</script>

<template> 
  <main class="panel">
    <ProvideTaskTemplateContext :commitId="commitId">
      <TaskTemplate :taskTemplateId="taskTemplateId" />
    </ProvideTaskTemplateContext>
  </main>
</template>

<style scoped>
</style>