<script setup lang="ts">
  import { GamecoreNode, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import AnyBlock from '@/views/gamecore/AnyBlock.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    Predicate:GamecoreNode
    SuccessTaskList:GamecoreNode[]
    FailedTaskList:GamecoreNode[]
  }

  const predicate = node.Predicate;
  const successTasks = node.SuccessTaskList;
  const failedTasks = node.FailedTaskList;
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">If</span>
    <template #content>
      
      <AnyBlock :node="predicate" />

      <div class="subblock">
        <template v-if="successTasks && successTasks.length > 0">
          <span class="flow">Then</span>
          <template v-for="n in successTasks">
            <AnyBlock :node="n" />
          </template>
        </template>

        <template v-if="failedTasks && failedTasks.length > 0">
          <span class="flow">Else</span>
          <template v-for="n in failedTasks">
            <AnyBlock :node="n" />
          </template>
        </template>
      </div>

    </template>
  </BlockLayout>
</template>

<style scoped>
</style>