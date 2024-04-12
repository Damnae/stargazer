<script setup lang="ts">
  import { ref } from 'vue';
  import { DiffNode, DiffNodeChange, KeyToDiffNode } from './diff';
  import AnyDiff from '@/views/diff/AnyDiff.vue';
  import AnyPlain from '@/views/diff/AnyPlain.vue';

  const props = defineProps<{diffNode:DiffNode}>()
  const properties = ref(props.diffNode.Content as KeyToDiffNode)
</script>

<template>
  <span class="diff-object" v-if="properties && Object.keys(properties).length > 0">
    {
      <span class="object-item block" v-for="node, key in properties">
        <AnyDiff :diffNode="node" :prefix="key" :isClutter="diffNode.Change == DiffNodeChange.Changed && node.Change == DiffNodeChange.Same" />
      </span>
    }
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