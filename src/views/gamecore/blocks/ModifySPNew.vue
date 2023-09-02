<script setup lang="ts">
  import { GamecoreNode, 
    GamecoreTargetType, evaluateTargetType, 
    DynamicExpression, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreNode}>()
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

    <template v-if="node.AddValue">
      Add <em><EvaluateExpression :expression="node.AddValue" /></em> flat energy
    </template>
    <template v-if="node.FixedAddValue">
      Add <em><EvaluateExpression :expression="node.FixedAddValue" /></em> flat energy
      <span class="minor">(Ignores ER)</span>
    </template>
    <template v-else-if="node.AddRatio">
      Add <em><EvaluateExpression :expression="node.AddRatio" /></em> of the skill energy bonus
    </template>
    <template v-else-if="node.AddMaxSPRatio">
      Add <em><EvaluateExpression :expression="node.AddMaxSPRatio" /></em>× energy
    </template>
    <template v-else-if="node.FixedAddMaxSPRatio">
      Add <em><EvaluateExpression :expression="node.FixedAddMaxSPRatio" /></em>× energy
      <span class="minor">(Ignores ER)</span>
    </template>
    <template v-else>
      Add energy
    </template>

    to <em>{{ evaluateTargetType(node.TargetType) }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>