<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Predicate:GamecoreTask
    TaskList:GamecoreTask[]
  }

  const predicate = node.Predicate;
  const tasks = node.TaskList;
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">While</span>
    <template #content>
      
      <AnyTask :node="predicate" />

      <div class="subblock">
        <template v-if="tasks && tasks.length > 0">
          <span class="flow">Do</span>
          <template v-for="n in tasks">
            <AnyTask :node="n" />
          </template>
        </template>
      </div>

    </template>
  </BlockLayout>
</template>

<style scoped>
</style>