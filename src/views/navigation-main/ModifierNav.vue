<script setup lang="ts">
  import { ref, computed, inject, Ref, } from 'vue'
  import { RouterLink } from 'vue-router';
  import NavItem from '@/components/NavItem.vue'
  import { TaskContext, TaskContextType, getTaskContext } from '@/sources/ability';

  const commitId = inject<string>('commitId') as string
  const search = inject<Ref<string>>('search') as Ref<string>

  const taskContext = ref<TaskContext>(await getTaskContext(commitId, TaskContextType.All))
  const sortedModifiers = computed(() => Object.values(taskContext.value.Modifiers)
    .sort((a, b) => a.Name > b.Name ? 1 : -1))
  const modifiersSearchResults = computed(() => sortedModifiers.value
    .filter(v => v.Name.toLowerCase().includes(search.value.toLowerCase())))
</script>

<template>
  <NavItem v-for="modifier in modifiersSearchResults" :key="modifier.Name">
    <RouterLink :to="{ name:'modifier', params:{ commitId: commitId, modifierId: modifier.Name }}">
      <span :title="modifier.Name">{{ modifier.Name }}</span>
    </RouterLink>
  </NavItem>
</template>

<style scoped>
</style>