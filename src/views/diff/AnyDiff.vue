<script setup lang="ts">
  import { DiffNode, DiffNodeType } from './diff';
  import ObjectDiff from '@/views/diff/ObjectDiff.vue';
  import ArrayDiff from '@/views/diff/ArrayDiff.vue';
  import ValueDiff from '@/views/diff/ValueDiff.vue';
  defineProps<{diffNode:DiffNode, prefix?:string|number}>()
</script>

<template>
  <span :class="`diff-node change-${diffNode.Change}`" :title="`${diffNode.Change} ${diffNode.Type}`">
    <template v-if="prefix">
      {{ prefix }}: 
    </template>

    <template v-if="diffNode.Type == DiffNodeType.Value">
      <ValueDiff :diffNode="diffNode" />
    </template>
    <template v-else-if="diffNode.Type == DiffNodeType.Object">
      <ObjectDiff :diffNode="diffNode" />
    </template>
    <template v-else-if="diffNode.Type == DiffNodeType.Array">
      <ArrayDiff :diffNode="diffNode" />
    </template>
    <template v-else-if="diffNode.Type">
      <pre>??? {{ diffNode }}</pre>
    </template>
  </span>
</template>

<style scoped>
</style>