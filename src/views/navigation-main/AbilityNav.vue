<script setup lang="ts">
  import { ref, computed, inject, Ref, } from 'vue'
  import { RouterLink } from 'vue-router';
  import NavItem from '@/components/NavItem.vue'
  import { Ability, TaskContext, TaskContextType, getTaskContext } from '@/sources/ability';

  const commitId = inject<string>('commitId') as string
  const search = inject<Ref<string>>('search') as Ref<string>

  const taskContext = ref<TaskContext>(await getTaskContext(commitId, TaskContextType.All))
  const abilitiesSearchResults = computed(() => allAbilities())

  function allAbilities() : Ability[]
  {
    return Object.values(taskContext.value.Abilities)
      .filter(v => v.Name.toLowerCase().includes(search.value.toLowerCase()))
      .sort((a, b) => a.Name > b.Name ? 1 : -1)
  }
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