<script setup lang="ts">
  import { cleanupFilename } from '@/common/common';
  import { FileCompareEntry } from '@/common/changes-file';
  import RepositoryFileLink from '@/components/RepositoryFileLink.vue';

  defineProps<{commitId:string,file:FileCompareEntry}>()
</script>

<template>

  <div class="block">
    <RepositoryFileLink :commitId="commitId" :path="file.Path" :title="file.Path">
      <span class="minor">{{ file.Type }}</span> <em>{{ cleanupFilename(file.Path) }}</em> 
    </RepositoryFileLink>
  </div>

</template>

<style scoped>
</style>