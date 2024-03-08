<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    DynamicKey:string
    ContextScope:string
    ResetValue?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">

    Define <em v-if="node.ContextScope">{{ node.ContextScope }}.</em><em>{{ node.DynamicKey }}</em>
    <template v-if="node.TargetType">
      on <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>
    <template v-if="node.ResetValue">
      to <em><EvaluateExpression :expression="node.ResetValue" /></em>
    </template>
    <template v-else>
      to <em>0</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>