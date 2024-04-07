<script setup lang="ts">
  import { ref, watch, } from 'vue';
  import { retrieveCompare, DataSourceCompare, } from '@/common/datasource';
  import FileItem from './FileItem.vue';
  import LoadingArea from '@/components/LoadingArea.vue';

  const props = defineProps<{fromCommitId:string, commitId:string}>()

  const loading = ref(true)
  const compare = ref<DataSourceCompare>(await retrieveCompare(props.fromCommitId, props.commitId))
  watch(props, async () => 
  {
    loading.value = true
    compare.value = await retrieveCompare(props.fromCommitId, props.commitId)
    loading.value = false
  }, { immediate:true })

</script>

<template>

  <h2>Files</h2>

  <LoadingArea :loading="loading">
    <span class="minor">Note: Only a specific list of files are watched here</span>

    <h3>{{ compare.AddedFiles.length }} Added</h3>
    <template v-for="file in compare.AddedFiles">
      <FileItem :file="file" />
    </template>
    
    <h3>{{ compare.RemovedFiles.length }} Removed</h3>
    <template v-for="file in compare.RemovedFiles">
      <FileItem :file="file" />
    </template>
  </LoadingArea>

</template>

<style scoped>
</style>