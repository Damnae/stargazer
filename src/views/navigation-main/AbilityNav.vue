<script setup lang="ts">
  import { ref, computed, inject, Ref, } from 'vue'
  import { RouterLink } from 'vue-router';
  import NavItem from '@/components/NavItem.vue'
  import { TaskContext, TaskContextType, getTaskContext } from '@/sources/ability';

  const commitId = inject<string>('commitId') as string
  const search = inject<Ref<string>>('search') as Ref<string>

  const taskContext = ref<TaskContext>(await getTaskContext(commitId, TaskContextType.All))
  const sortedAbilities = computed(() => Object.values(taskContext.value.Abilities)
    .sort((a, b) => a.Name > b.Name ? 1 : -1))
  const abilitiesSearchResults = computed(() => sortedAbilities.value
    .filter(v => v.SearchKeywords.some(k => k.includes(search.value.toLowerCase()))))
</script>

<template>
  <NavItem v-for="ability in abilitiesSearchResults" :key="ability.Name">
    <RouterLink :to="{ name:'ability', params:{ commitId: commitId, abilityId: ability.Name }}">
      <span :title="ability.Name">{{ ability.Name }}</span>
    </RouterLink>
  </NavItem>
</template>

<style scoped>
</style>