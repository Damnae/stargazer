<script setup lang="ts">
  import { ref, computed, inject, Ref, } from 'vue'
  import { RouterLink } from 'vue-router';
  import { getStatuses, Status, StatusConfig, } from '@/scripts/sources/status';

  const commitId = inject<string>('commitId') as string
  const search = inject<Ref<string>>('search') as Ref<string>

  const statuses = ref<StatusConfig>(await getStatuses(commitId))
  const statusesSearchResults = computed(() => allStatuses())

  function allStatuses() : Status[]
  {
    return Object.values(statuses.value)
      .filter(v => v.SearchKeywords.some(k => k.includes(search.value.toLowerCase())))
      .sort((a, b) => a.StatusName.Text > b.StatusName.Text ? 1 : -1)
  }
</script>

<template>
  <ul>
    <template v-for="status in statusesSearchResults" :key="status.StatusID">
      <li>
        <RouterLink :to="{ name:'status', params:{ commitId: commitId, objectId: status.StatusID }}">
          <span :title="status.StatusName.Text">{{ status.StatusName.Text }}</span>
        </RouterLink>
      </li>
    </template>
  </ul>
</template>

<style scoped>
</style>