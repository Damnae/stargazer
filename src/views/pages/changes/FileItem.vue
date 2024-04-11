<script setup lang="ts">
  import { cleanupFilename } from '@/common/common';
  import { FileCompareEntry } from '@/common/changes-file';
  import FoldableLayout from '@/components/FoldableLayout.vue';
  import RepositoryFileLink from '@/components/RepositoryFileLink.vue';
  import FileDiff from '@/views/diff/FileDiff.vue';

  defineProps<{commitId:string, diffFromCommitId?:string, file:FileCompareEntry}>()
</script>

<template>

  <FoldableLayout :lazy="true">
    <span class="minor">{{ file.Type }}</span>&nbsp;<RepositoryFileLink :commitId="commitId" :path="file.Path" :title="file.Path">
      <em>{{ cleanupFilename(file.Path) }}</em> 
    </RepositoryFileLink>
    <template #content>
      <div class="block">
        <FileDiff :fromCommitId="diffFromCommitId ?? commitId" :toCommitId="commitId" :path="file.Path" />
      </div>
    </template>
  </FoldableLayout>

</template>

<style scoped>
</style>