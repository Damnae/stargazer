<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Predicate:GamecoreTask
    SuccTarget:GamecoreTask
    FailTarget:GamecoreTask
  }

  const predicate = node.Predicate;
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Select target by</span>
    <template #content>
      <AnyTask :node="predicate" />

      <div class="subblock">
        <span class="flow">Target matches filter</span>
          <AnyTask :node="node.SuccTarget" />
      </div>
      <div class="subblock">
        <span class="flow">Target does not match filter</span>
        <AnyTask :node="node.FailTarget" />
      </div>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>