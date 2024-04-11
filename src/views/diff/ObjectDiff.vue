<script setup lang="ts">
  import { ref } from 'vue';
  import { DiffNode, DiffNodeChange, KeyToDiffNode } from './diff';
  import AnyDiff from '@/views/diff/AnyDiff.vue';
  const props = defineProps<{diffNode:DiffNode}>()
  const properties = ref(props.diffNode.Content as KeyToDiffNode)
</script>

<template>
  <span class="diff-object">
    <template v-if="properties && Object.keys(properties).length > 0">
      {
        <span class="object-item block" v-for="node, key in properties">
          <AnyDiff :diffNode="node" :prefix="`${key}: `" />
        </span>
      }
    </template>
    <span class="object-item" v-else-if="diffNode.Change == DiffNodeChange.Removed">
      {{ diffNode.FromValue }}
    </span>
    <span class="object-item" v-else>
      {{ diffNode.ToValue }}
    </span>
  </span>
</template>

<style scoped>
</style>