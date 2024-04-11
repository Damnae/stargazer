<script setup lang="ts">
  import { ref } from 'vue';
  import { DiffNode, DiffNodeChange, } from './diff';
  import AnyDiff from '@/views/diff/AnyDiff.vue';
  const props = defineProps<{diffNode:DiffNode}>()
  const values = ref(props.diffNode.Content as DiffNode[])
</script>

<template>
  <span class="diff-array">
    <template v-if="values && values.length > 0">
      [
        <span class="array-item block" v-for="node, _key in values">
          <AnyDiff :diffNode="node" />
        </span>
      ]
    </template>
    <span class="array-item" v-else-if="diffNode.Change == DiffNodeChange.Removed">
      {{ diffNode.FromValue }}
    </span>
    <span class="array-item" v-else>
      {{ diffNode.ToValue }}
    </span>
  </span>
</template>

<style scoped>
</style>