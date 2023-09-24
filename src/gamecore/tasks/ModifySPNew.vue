<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    AddValue?:DynamicExpression
    FixedAddValue?:DynamicExpression
    AddRatio?:DynamicExpression
    AddMaxSPRatio?:DynamicExpression
    FixedAddMaxSPRatio?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">

    <template v-if="node.AddRatio">
      Generate <em><EvaluateExpression :expression="node.AddRatio" /></em>× of the skill's energy
    </template>
    <template v-else-if="node.AddValue">
      Generate <em><EvaluateExpression :expression="node.AddValue" /></em> flat energy
    </template>
    <template v-else-if="node.FixedAddValue">
      Generate <em><EvaluateExpression :expression="node.FixedAddValue" /></em> flat energy
      <span class="minor">(Ignores ER)</span>
    </template>
    <template v-else-if="node.AddMaxSPRatio">
      Generate <em><EvaluateExpression :expression="node.AddMaxSPRatio" /></em>× energy
    </template>
    <template v-else-if="node.FixedAddMaxSPRatio">
      Generate <em><EvaluateExpression :expression="node.FixedAddMaxSPRatio" /></em>× energy
      <span class="minor">(Ignores ER)</span>
    </template>
    <template v-else>
      Generate energy
    </template>

    for <em><EvaluateTargetType :target="node.TargetType" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>