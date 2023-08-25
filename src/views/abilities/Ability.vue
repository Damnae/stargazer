<script setup lang="ts">
  import { ref, inject, } from 'vue'
  import { GamecoreContext } from '../../scripts/sources/gamecore';

  const props = defineProps<{abilityId:string, context:GamecoreContext}>()
  const commitId = inject<string>('commitId') as string
</script>

<template>
  <header>
    <h1>{{ abilityId.replace(/_/g, " ") }}</h1>
  </header>
</template>

<style scoped>
</style>