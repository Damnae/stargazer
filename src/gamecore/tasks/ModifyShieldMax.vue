<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import ModifierLink from '@/gamecore/ModifierLink.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    SpecifiedModifierCaster?:GamecoreTargetType
    ShieldModifiers?:string[]
    ModifyOp:string
    FormulaValue?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Change
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s
    </template>
    max shield
    <template v-if="node.ShieldModifiers">
      <template v-if="node.SpecifiedModifierCaster">
        from <em><EvaluateTargetType :target="node.SpecifiedModifierCaster" /></em>'s
      </template>
      modifier 
      <template v-for="modifier in node.ShieldModifiers">
        <ModifierLink :modifierName="modifier" />
      </template>
    </template>
    by {{ node.ModifyOp ?? 'Add(?)' }} <em><EvaluateExpression :expression="node.FormulaValue" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>