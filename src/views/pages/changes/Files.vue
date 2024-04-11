<script setup lang="ts">
  import { ref, watch, } from 'vue';
  import { retrieveFileCompare, FileCompare, } from '@/common/changes-file';
  import FileItem from './FileItem.vue';
  import LoadingArea from '@/components/LoadingArea.vue';

  const props = defineProps<{fromCommitId:string, commitId:string}>()

  const loading = ref(true)
  const compare = ref<FileCompare>(await retrieveFileCompare(props.fromCommitId, props.commitId))
  watch(props, async () => 
  {
    loading.value = true
    compare.value = await retrieveFileCompare(props.fromCommitId, props.commitId)
    loading.value = false
  }, { immediate:true })
</script>

<template>

  <h2>
    Files 
    <span class="minor" title="Only 'interesting' files are watched here">*</span>
  </h2>

  <LoadingArea :loading="loading">
    <h3>{{ compare.Added.length }} Added</h3>
    <template v-for="file in compare.Added">
      <FileItem :commitId="commitId" :file="file" />
    </template>
    
    <h3>{{ compare.Changed.length }} Changed</h3>
    <template v-for="file in compare.Changed">
      <FileItem :commitId="commitId" :diffFromCommitId="fromCommitId" :file="file" />
    </template>

    <h3>{{ compare.Removed.length }} Removed</h3>
    <template v-for="file in compare.Removed">
      <FileItem :commitId="fromCommitId" :file="file" />
    </template>
  </LoadingArea>

</template>

<style scoped>
</style>@/common/changes-file