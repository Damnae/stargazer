<script setup lang="ts">
  import { provide } from 'vue'
  import CommitNav from './CommitNav.vue'

  const props = defineProps<{commitId: string}>()
  provide<string>('commitId', props.commitId)
</script>

<template>
  <div class="commit-layout">
    <CommitNav />
    <router-view />
  </div>
</template>

<style scoped>
  .commit-layout
  {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    gap:.5rem;
    padding:0 .5em;
  }
</style>
