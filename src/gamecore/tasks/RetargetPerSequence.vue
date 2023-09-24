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
    Parallel:boolean
    SequenceList?:[
      {
        TaskList:GamecoreTask[]
      }
    ]
  }
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
    </span>
    <template #content>
      <div class="subblock">
        <template v-if="node.Predicate">
          <span class="flow">With Condition</span>
          <AnyTask :node="node.Predicate" />
        </template>
        <template v-if="node.SequenceList && node.SequenceList.length > 0" v-for="sequence in node.SequenceList">
          <span class="flow">Do {{ node.Parallel ? '(in parallel)' : '' }}</span>
          <template v-for="n in sequence.TaskList">
            <AnyTask :node="n" />
          </template>
        </template>
      </div>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>