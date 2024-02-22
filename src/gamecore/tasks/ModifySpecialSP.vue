<script setup lang="ts">
  import { GamecoreTask } from '@/sources/gamecore';
  import ModifySPNew from './ModifySPNew.vue';

  defineProps<{node:GamecoreTask}>()
</script>

<template>
  <ModifySPNew :node="node" />
</template>

<style scoped>
</style>