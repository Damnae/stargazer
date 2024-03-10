<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    SetValue?:DynamicExpression
    AddValue?:DynamicExpression
    FixedAddValue?:DynamicExpression
    AddRatio?:DynamicExpression
    AddMaxSPRatio?:DynamicExpression
    FixedAddMaxSPRatio?:DynamicExpression
    IgnoreBlock?:boolean
  }
</script>

<template>
  <BlockLayout :source="node">

    <template v-if="node.SetValue">
      Set special energy to <em><EvaluateExpression :expression="node.SetValue" /></em>
    </template>
    <template v-else-if="node.AddRatio">
      Generate <em><EvaluateExpression :expression="node.AddRatio" /></em>× of the skill's special energy
    </template>
    <template v-else-if="node.AddValue">
      Generate <em><EvaluateExpression :expression="node.AddValue" /></em> flat special energy
    </template>
    <template v-else-if="node.FixedAddValue">
      Generate <em><EvaluateExpression :expression="node.FixedAddValue" /></em> flat special energy
      <span class="minor">(Ignores ER)</span>
    </template>
    <template v-else-if="node.AddMaxSPRatio">
      Generate <em><EvaluateExpression :expression="node.AddMaxSPRatio" /></em>× special energy
    </template>
    <template v-else-if="node.FixedAddMaxSPRatio">
      Generate <em><EvaluateExpression :expression="node.FixedAddMaxSPRatio" /></em>× special energy
      <span class="minor">(Ignores ER)</span>
    </template>
    <template v-else>
      Generate special energy
    </template>

    for <em><EvaluateTargetType :target="node.TargetType" /></em>

    <template v-if="node.IgnoreBlock === true">
      &nbsp;<span class="minor">(Ignores block)</span>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>