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
    MaxNumber?:DynamicExpression
    Predicate?:GamecoreTask
    IncludeLimbo:boolean
    TaskList?:GamecoreTask[]
  }

  const tasks = node.TaskList;
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">
      Retarget
      <template v-if="node.MaxNumber">
        up to <EvaluateExpression :expression="node.MaxNumber" /> in 
      </template>
      <template v-else>
        all in 
      </template>
      <EvaluateTargetType :target="node.TargetType" />
      <span class="minor">
        <template v-if="node.IncludeLimbo">
          (Including Limbo) 
        </template>
        <template v-else>
          (Excluding Limbo) 
        </template>
      </span>
      as list
    </span>
    <template #content>
      <div class="subblock">
        <template v-if="node.Predicate">
          <span class="flow">With Condition</span>
          <AnyTask :node="node.Predicate" />
        </template>
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