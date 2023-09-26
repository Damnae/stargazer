<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ComposeType:string
    SelectorList:GamecoreTask[]
  }

  const selectors = node.SelectorList;
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Compose Selector <em>{{ node.ComposeType ?? 'ByAnd' }}</em></span>
    <template #content>
        <AnyTask v-for="n in selectors" :node="n" />
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>