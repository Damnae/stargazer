<script setup lang="ts">
  import { ref, inject, provide, } from 'vue'

  const props = defineProps<{abilityId:string}>()
  const commitId = inject<string>('commitId') as string
</script>

<template>
  <h1>{{ abilityId.replace(/_/g, " ") }}</h1>
</template>

<style scoped>
</style>