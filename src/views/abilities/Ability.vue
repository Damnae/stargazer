<script setup lang="ts">
  import { ref, inject, } from 'vue'
  import { AbilityContext } from '../../scripts/sources/ability';

  const props = defineProps<{abilityId:string, context:AbilityContext}>()
  const commitId = inject<string>('commitId') as string
</script>

<template>
  <header>
    <h1>{{ abilityId.replace(/_/g, " ") }}</h1>
  </header>
  <pre>{{ context }}</pre>
</template>

<style scoped>
</style>