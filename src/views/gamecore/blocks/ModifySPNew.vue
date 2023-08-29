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
    AddValue:DynamicExpression
    AddRatio:DynamicExpression
    FixedAddMaxSPRatio:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">

    <template v-if="node.AddValue">
      Add <em><EvaluateExpression :expression="node.AddValue" /></em> flat energy
    </template>
    <template v-else-if="node.AddRatio">
      Add <em><EvaluateExpression :expression="node.AddRatio" /></em> of the skill energy bonus
    </template>
    <template v-else-if="node.FixedAddMaxSPRatio">
      Add <em><EvaluateExpression :expression="node.FixedAddMaxSPRatio" /></em>% energy
    </template>
    <template v-else>
      Add energy
    </template>

    to <em>{{ evaluateTargetType(node.TargetType) }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>