<script setup lang="ts">
  import { GamecoreTask, 
    GamecoreTargetType, evaluateTargetType, DynamicExpression, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ConstantValue?:DynamicExpression
    ForbidWhenEmpty?:boolean
    SkipLockTeamStance?:boolean
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Restore 
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s
    </template>
    stance
    <template v-if="node.ConstantValue">
      by <em><EvaluateExpression :expression="node.ConstantValue" /></em>
    </template>
    <span v-if="node.ForbidWhenEmpty === true" class="minor">
      (Unless it's 0)
    </span>

  </BlockLayout>
</template>

<style scoped>
</style>