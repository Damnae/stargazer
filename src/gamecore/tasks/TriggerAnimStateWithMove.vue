<script setup lang="ts">
  import { DynamicExpression, GamecoreTargetType, GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';
import EvaluateExpression from '../EvaluateExpression.vue';
import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType:GamecoreTargetType
    AnimStateName:string
    NormalizedTimeEnd:DynamicExpression
    NormalizedTransitionDuration:DynamicExpression
    MovingRangeList:[]
    EventList:
    [
      {
        NormalizedTime:DynamicExpression
        TaskList:GamecoreTask[]
      }
    ]
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="!node.EventList">
    <span :class="[node.EventList ? 'flow' : '']">Move <EvaluateTargetType :target="node.TargetType" /> with animation <em>{{ node.AnimStateName }}</em></span>
    <template #content>

      <div class="subblock">
        <template v-for="event in node.EventList">
          <span class="flow">At <em><EvaluateExpression :expression="event.NormalizedTime" /></em></span>
          <template v-for="n in event.TaskList">
            <AnyTask :node="n" />
          </template>
        </template>
      </div>

    </template>
  </BlockLayout>
</template>

<style scoped>
</style>