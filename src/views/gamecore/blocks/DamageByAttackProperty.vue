<script setup lang="ts">
  import { inject, Ref, } from 'vue';
  import { getHash } from '@/scripts/translate';
  import { GamecoreNode, GamecoreContext,
    GamecoreTargetType, evaluateTargetType, 
    DynamicExpression, evaluateDynamicExpression,
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

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
  const gamecoreContext = inject('gamecoreContext') as Ref<GamecoreContext>
</script>

<template>
  <BlockLayout :source="node">
    
    Deal 
    <template v-if="node.AttackProperty?.HitSplitRatio">
      <em>{{ evaluateDynamicExpression(node.AttackProperty.HitSplitRatio, gamecoreContext) }}</em> of 
    </template>

    <template v-if="node.AttackProperty?.DamagePercentage">
      <em>{{ evaluateDynamicExpression(node.AttackProperty.DamagePercentage, gamecoreContext) }}</em>%
      {{ node.AttackProperty.FormulaType ?? "Atk" }} damage
    </template>
    <template v-if="node.AttackProperty?.ExtraDamagePercentage">
      <em>{{ evaluateDynamicExpression(node.AttackProperty.ExtraDamagePercentage, gamecoreContext) }}</em>%
      {{ node.AttackProperty.ExtraFormulaType }} damage
    </template>
    <template v-if="node.AttackProperty?.DamageValue">
      <em>{{ evaluateDynamicExpression(node.AttackProperty.DamageValue, gamecoreContext) }}</em> flat damage
    </template>
    <template v-if="node.AttackProperty?.StanceValue">
      <em>{{ evaluateDynamicExpression(node.AttackProperty.StanceValue, gamecoreContext) }}</em> toughness damage
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