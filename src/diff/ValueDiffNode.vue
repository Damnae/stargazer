<script setup lang="ts">
  import { DiffNode, DiffNodeChange } from './diff';
  import AnyPlain from './AnyPlain.vue';

  defineProps<{diffNode:DiffNode}>()
</script>

<template>
  <span class="diff-value" v-if="diffNode.Change == DiffNodeChange.Replaced">
    <span class="change-Removed">{{ diffNode.FromValue }}</span> <span class="change-Added">{{ diffNode.ToValue }}</span>
  </span>
  <template v-else-if="diffNode.Change == DiffNodeChange.Removed">
    <AnyPlain :value="diffNode.FromValue" />
  </template>
  <template v-else>
    <AnyPlain :value="diffNode.ToValue" />
  </template>
</template>

<style scoped>
</style>