<script setup lang="ts">
  import { provide } from 'vue'
  import CommitNav from '@/views/navigation/CommitNav.vue'

  const props = defineProps<{commitId:string}>()
  provide<string>('commitId', props.commitId)
</script>

<template>
  <div class="commit-layout">
    <CommitNav>
      <RouterView name="subnav" />
    </CommitNav>
    <RouterView />
  </div>
</template>

<style scoped>
  .commit-layout
  {
    display: flex;
    flex-direction: row;
    justify-content: left;
    width: 100%;
    gap:.5rem;
    padding:0 .5em;
  }
</style>
