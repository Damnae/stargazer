<script setup lang="ts">
  import { DiffNode, DiffNodeType } from './diff';
  import ObjectDiffNode from './ObjectDiffNode.vue';
  import ArrayDiffNode from './ArrayDiffNode.vue';
  import ValueDiffNode from './ValueDiffNode.vue';

  defineProps<{diffNode:DiffNode, prefix?:string|number, isClutter?:boolean}>()
</script>

<template>
  <span :class="`diff-node change-${diffNode.Change}`" :title="`${diffNode.Change} ${diffNode.Type}`">
    <template v-if="prefix">
      {{ prefix }}: 
    </template>

    <template v-if="diffNode.Type == DiffNodeType.Value">
      <ValueDiffNode :diffNode="diffNode" />
    </template>
    <template v-else-if="diffNode.Type == DiffNodeType.Object">
      <template v-if="isClutter">{…}</template>
      <template v-else>
        <ObjectDiffNode :diffNode="diffNode" />
      </template>
    </template>
    <template v-else-if="diffNode.Type == DiffNodeType.Array">
      <template v-if="isClutter">[…]</template>
      <template v-else>
        <ArrayDiffNode :diffNode="diffNode" />
      </template>
    </template>
    <template v-else-if="diffNode.Type">
      <pre>??? {{ diffNode }}</pre>
    </template>
  </span>
</template>

<style scoped>
</style>