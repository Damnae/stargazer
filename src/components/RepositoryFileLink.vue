<script setup lang="ts">
  import { getRepositoryFileUrl } from '@/common/datasource';
  defineProps<{commitId:string,path:string}>()
</script>

<template>
  <a :href="getRepositoryFileUrl(commitId, path)" target="_blank" rel="noreferrer noopener">
    <slot />
  </a>
</template>

<style scoped>
</style>