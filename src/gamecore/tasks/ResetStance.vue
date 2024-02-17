<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ConstantValue?:DynamicExpression
    AddValue?:DynamicExpression
    ForbidWhenEmpty?:boolean
    SkipLockTeamStance?:boolean
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Reset 
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s
    </template>
    toughness,
    <template v-if="node.ConstantValue">
      set to <em><EvaluateExpression :expression="node.ConstantValue" /></em>
    </template>
    <template v-if="node.AddValue">
      add <em><EvaluateExpression :expression="node.AddValue" /></em>
    </template>
    <span v-if="node.ForbidWhenEmpty === true" class="minor">
      (Unless it's 0)
    </span>

  </BlockLayout>
</template>

<style scoped>
</style>