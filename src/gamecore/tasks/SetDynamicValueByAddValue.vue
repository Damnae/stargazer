<script setup lang="ts">
  import { GamecoreTask, 
    GamecoreTargetType, evaluateTargetType, 
    DynamicExpression,
  } from '@/sources/gamecore';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    Key:string
    AddValue:DynamicExpression
    Min:DynamicExpression
    Max:DynamicExpression
  }

  if (node.Key)
    useHashStore().register(node.Key, true)
</script>

<template>
  <BlockLayout :source="node">

    Add <em><EvaluateExpression :expression="node.AddValue" /></em>
    
    to
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s
    </template>
    <em>{{ node.Key }}</em>,
    clamp between <em><EvaluateExpression :expression="node.Min" /></em>
    and <em><EvaluateExpression :expression="node.Max" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>