<script setup lang="ts">
  import { DataSourceCompareFile } from '@/common/datasource';

  defineProps<{file:DataSourceCompareFile}>()
</script>

<template>

  <div class="block">
    <em>{{ file.Path }}</em>
  </div>

</template>

<style scoped>
</style>