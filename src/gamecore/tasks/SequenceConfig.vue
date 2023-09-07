<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TaskList:GamecoreTask[]
  }

  const tasks = node.TaskList;
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Run sequence</span>
    <template #content>

      <template v-if="tasks && tasks.length > 0">
        <template v-for="n in tasks">
          <AnyTask :node="n" />
        </template>
      </template>

    </template>
  </BlockLayout>
</template>

<style scoped>
</style>