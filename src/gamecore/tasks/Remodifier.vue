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
    BehaviorFlagFilter?:string[]
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
        up to <EvaluateExpression :expression="node.MaxNumber" /> modifiers on 
      </template>
      <template v-else>
        all modifiers on 
      </template>
      <EvaluateTargetType :target="node.TargetType" />
      <template v-if="node.BehaviorFlagFilter">
        with <em>{{ node.BehaviorFlagFilter.join(', ') }}</em>
      </template>
    </span>
    <template #content>
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