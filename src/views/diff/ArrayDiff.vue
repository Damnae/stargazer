<script setup lang="ts">
  import { ref } from 'vue';
  import { DiffNode, DiffNodeChange, } from './diff';
  import AnyDiff from '@/views/diff/AnyDiff.vue';
  import AnyPlain from '@/views/diff/AnyPlain.vue';

  const props = defineProps<{diffNode:DiffNode}>()
  const values = ref(props.diffNode.Content as DiffNode[])
</script>

<template>
  <span class="diff-array" v-if="values && values.length > 0">
    [
      <span class="array-item block" v-for="node, _key in values">
        <AnyDiff :diffNode="node" :isClutter="diffNode.Change == DiffNodeChange.Changed && node.Change == DiffNodeChange.Same" />
      </span>
    ]
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