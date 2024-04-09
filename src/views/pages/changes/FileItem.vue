<script setup lang="ts">
  import { FileCompareEntry } from '@/common/changes';
  import RepositoryFileLink from '@/components/RepositoryFileLink.vue';

  defineProps<{commitId:string,file:FileCompareEntry}>()
</script>

<template>

  <div class="block">
    <RepositoryFileLink :commitId="commitId" :path="file.Path">
      <em>{{ file.Path }}</em>
    </RepositoryFileLink>
  </div>

</template>

<style scoped>
</style>