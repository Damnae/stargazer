<script setup lang="ts">
  import { ref, computed, inject, Ref, } from 'vue'
  import { RouterLink } from 'vue-router';
  import { getRelicSets, RelicSet, RelicSetConfig, } from '@/sources/relicset';
  import NavItem from '@/components/NavItem.vue'

  const commitId = inject<string>('commitId') as string
  const search = inject<Ref<string>>('search') as Ref<string>

  const relicsets = ref<RelicSetConfig>(await getRelicSets(commitId))
  const relicsetsSearchResults = computed(() => allRelicSets())

  function allRelicSets() : RelicSet[]
  {
    return Object.values(relicsets.value)
      .filter(v => v.SearchKeywords.some(k => k.includes(search.value.toLowerCase())))
      .sort((a, b) => a.SetID > b.SetID ? 1 : -1)
  }
</script>

<template>
  <NavItem v-for="relicset in relicsetsSearchResults" :key="relicset.SetID">
    <RouterLink :to="{ name:'relicset', params:{ commitId: commitId, objectId: relicset.SetID }}">
      <span :title="relicset.SetName.Text">{{ relicset.SetName.Text }}</span>
    </RouterLink>
  </NavItem>
</template>

<style scoped>
</style>