<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import IncludeTaskListTemplate from './IncludeTaskListTemplate.vue';

  defineProps<{node:GamecoreTask}>()
</script>

<template>
  <IncludeTaskListTemplate :node="node" />
</template>