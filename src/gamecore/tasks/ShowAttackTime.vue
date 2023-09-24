<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    BaseAttackTime?:DynamicExpression
    EnhancedAttackTime?:DynamicExpression
    IsShow?:boolean
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    {{ node.IsShow ? 'Show' : 'Hide' }} attack time
    <template v-if="node.TargetType">
      for <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>

    as
    <template v-if="node.BaseAttackTime">
      Base: <em><EvaluateExpression :expression="node.BaseAttackTime" /></em>
    </template>
    <template v-if="node.EnhancedAttackTime">
      <template  v-if="node.BaseAttackTime">+</template>
      Enhanced: <em><EvaluateExpression :expression="node.EnhancedAttackTime" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>