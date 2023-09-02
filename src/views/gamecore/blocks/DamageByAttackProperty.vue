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
    AttackProperty:
    {
      DamageType?:string
      DamageTypeFromAttacker?:boolean
      HitSplitRatio?:DynamicExpression
      DamagePercentage?:DynamicExpression
      BreakDamagePercentage?:DynamicExpression
      FormulaType?:string
      ExtraDamagePercentage?:DynamicExpression
      ExtraFormulaType?:string
      DamageValue?:DynamicExpression
      StanceValue?:DynamicExpression
      SPHitRatio?:DynamicExpression
      AttackType?:string
      FinalFormulaType?:string
    }
    CanTriggerLastKill:boolean
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Deal 
    <template v-if="node.AttackProperty?.HitSplitRatio">
      <em><EvaluateExpression :expression="node.AttackProperty.HitSplitRatio" /></em> of 
    </template>

    <template v-if="node.AttackProperty?.DamagePercentage">
      <em><EvaluateExpression :expression="node.AttackProperty.DamagePercentage" /></em>×
      {{ node.AttackProperty.FormulaType ?? "ByAttack" }} damage
    </template>
    <template v-else-if="node.AttackProperty?.BreakDamagePercentage">
      <em><EvaluateExpression :expression="node.AttackProperty.BreakDamagePercentage" /></em>×
      {{ node.AttackProperty.FormulaType ?? "ByAttack" }} damage
    </template>

    <template v-if="node.AttackProperty?.ExtraDamagePercentage">
      <em><EvaluateExpression :expression="node.AttackProperty.ExtraDamagePercentage" /></em>×
      {{ node.AttackProperty.ExtraFormulaType }} damage
    </template>
    <template v-if="node.AttackProperty?.DamageValue">
      <em><EvaluateExpression :expression="node.AttackProperty.DamageValue" /></em> flat damage
    </template>
    <template v-if="node.AttackProperty?.StanceValue">
      <em><EvaluateExpression :expression="node.AttackProperty.StanceValue" /></em> toughness damage
    </template>

    <template v-if="node.AttackProperty?.DamageTypeFromAttacker">
      as the attacker's element
    </template>
    <template v-else-if="node.AttackProperty?.DamageType">
      as <em>{{ node.AttackProperty?.DamageType ?? 'Physical' }}</em>
    </template>
    <template v-if="node.AttackProperty?.AttackType">
      / <em>{{ node.AttackProperty?.AttackType }}</em>
    </template>

    <template v-if="node.TargetType">
      to <em>{{ evaluateTargetType(node.TargetType) }}</em>
    </template>

    <template v-if="node.AttackProperty?.FinalFormulaType">
      using <em>{{ node.AttackProperty?.FinalFormulaType }}</em>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>