<script setup lang="ts">
  import { DataSourceCompareFile } from '@/common/datasource';
  import RepositoryFileLink from '@/components/RepositoryFileLink.vue';

  defineProps<{commitId:string,file:DataSourceCompareFile}>()
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