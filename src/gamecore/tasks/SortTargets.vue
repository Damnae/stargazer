<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType:GamecoreTargetType
    SortConfig?:GamecoreTask
    MaxNumber?:DynamicExpression
    TaskList?:GamecoreTask[]
  }

  const tasks = node.TaskList;
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">
      For 
      <template v-if="node.MaxNumber">
        up to <EvaluateExpression :expression="node.MaxNumber" /> in 
      </template>
      <template v-else>
        all in 
      </template>
      <EvaluateTargetType :target="node.TargetType" />
    </span>
    <template #content>
      <template v-if="node.SortConfig">
        <AnyTask :node="node.SortConfig" />
      </template>
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