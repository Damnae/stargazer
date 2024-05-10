<script setup lang="ts">
  import { ref } from 'vue';
  import { DiffNode, DiffNodeChange, KeyToDiffNode } from './diff';
  import AnyDiffNode from './AnyDiffNode.vue';
  import AnyPlain from './AnyPlain.vue';

  const props = defineProps<{diffNode:DiffNode}>()
  const properties = ref(props.diffNode.Content as KeyToDiffNode)
</script>

<template>
  <span class="diff-object" v-if="properties && Object.keys(properties).length > 0">
    {
      <span class="object-item block" v-for="node, key in properties">
        <AnyDiffNode :diffNode="node" :prefix="key" :isClutter="diffNode.Change == DiffNodeChange.Changed && node.Change == DiffNodeChange.Same" />
      </span>
    }
  </span>
  <template v-else-if="diffNode.Change == DiffNodeChange.Removed">
    <AnyPlain :value="diffNode.FromValue" />
  </template>
  <template v-else-if="diffNode.Change == DiffNodeChange.Replaced">
    <span class="change-Removed"><AnyPlain :value="diffNode.FromValue" /></span>
    <span class="change-Added"><AnyPlain :value="diffNode.ToValue" /></span>
  </template>
  <template v-else>
    <AnyPlain :value="diffNode.ToValue" />
  </template>
</template>

<style scoped>
</style>