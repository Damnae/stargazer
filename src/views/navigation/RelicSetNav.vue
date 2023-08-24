<script setup lang="ts">
  import { ref, computed, inject, Ref, } from 'vue'
  import { RouterLink } from 'vue-router';
  import { getRelicSets, RelicSet, RelicSetConfig, } from '../../scripts/sources/relicset';

  const commitId = inject<string>('commitId') as string
  const search = inject<Ref<string>>('search') as Ref<string>

  const relicsets = ref<RelicSetConfig>(await getRelicSets(commitId))
  const relicsetsSearchResults = computed(() => allRelicSets())

  function allRelicSets() : RelicSet[]
  {
    return Object.values(relicsets.value)
      .filter(v => v.SetName.Text.toLowerCase().includes(search.value.toLowerCase()))
      .sort((a, b) => a.SetName.Text > b.SetName.Text ? 1 : -1)
  }
</script>

<template>
  <ul>
    <template v-for="relicset in relicsetsSearchResults" :key="relicset.SetID">
      <li>
        <RouterLink :to="{ name:'relicset', params:{ commitId: commitId, objectId: relicset.SetID }}">
          <span :title="relicset.SetName.Text">{{ relicset.SetName.Text }}</span>
        </RouterLink>
      </li>
    </template>
  </ul>
</template>

<style scoped>
</style>