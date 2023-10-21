<script setup lang="ts">
  import { GamecoreTargetType, GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '../AnyTask.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType:GamecoreTargetType
    Predicate:GamecoreTask
  }
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Any in <em><EvaluateTargetType :target="node.TargetType" /></em> with condition</span>
    <template #content>
      <AnyTask :node="node.Predicate" />
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>