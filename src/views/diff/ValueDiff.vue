<script setup lang="ts">
  import { DiffNode, DiffNodeChange } from './diff';
  defineProps<{diffNode:DiffNode}>()
</script>

<template>
  <span class="diff-value">
    <template v-if="diffNode.Change == DiffNodeChange.Replaced">
      <span class="change-Removed">{{ diffNode.FromValue }}</span> <span class="change-Added">{{ diffNode.ToValue }}</span>
    </template>
    <template v-else-if="diffNode.Change == DiffNodeChange.Removed">
      {{ diffNode.FromValue }}
    </template>
    <template v-else>
      {{ diffNode.ToValue }}
    </template>
  </span>
</template>

<style scoped>
</style>