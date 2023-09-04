<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Predicate:GamecoreTask
    SuccessTaskList:GamecoreTask[]
    FailedTaskList:GamecoreTask[]
  }

  const predicate = node.Predicate;
  const successTasks = node.SuccessTaskList;
  const failedTasks = node.FailedTaskList;
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">If</span>
    <template #content>
      
      <AnyTask :node="predicate" />

      <div class="subblock">
        <template v-if="successTasks && successTasks.length > 0">
          <span class="flow">Then</span>
          <template v-for="n in successTasks">
            <AnyTask :node="n" />
          </template>
        </template>

        <template v-if="failedTasks && failedTasks.length > 0">
          <span class="flow">Else</span>
          <template v-for="n in failedTasks">
            <AnyTask :node="n" />
          </template>
        </template>
      </div>

    </template>
  </BlockLayout>
</template>

<style scoped>
</style>