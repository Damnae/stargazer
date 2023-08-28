<script setup lang="ts">
  import { AbilityContext, } from '@/scripts/sources/ability';
  import { GamecoreNode, 
    GamecoreTargetType, evaluateTargetType, 
    DynamicExpression, evaluateDynamicExpression,
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import { getHash } from '@/scripts/translate';

  const props = defineProps<{node:GamecoreNode, abilityContext:AbilityContext}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ModifierName:string
    Chance?:DynamicExpression
    MaxLayer?:DynamicExpression
    LifeTime?:DynamicExpression
    LifeStepImmediately?:boolean
    DynamicValues?:
    {
      [key:string]:DynamicExpression
    }
  }
</script>

<template>
  <BlockLayout :source="node">

    Add modifier
    <RouterLink :to="{  }">
      <em>{{ node.ModifierName }}</em>
    </RouterLink>

    <template v-if="node.TargetType">
      to <em>{{ evaluateTargetType(node.TargetType) }}</em>
    </template>
    <template v-if="node.Chance">
      with <em>{{ evaluateDynamicExpression(node.Chance) }}</em>% base chance
    </template>
    <template v-if="node.MaxLayer">
      with up to <em>{{ evaluateDynamicExpression(node.MaxLayer) }}</em> stacks
    </template>
    <template v-if="node.LifeTime">
      for <em>{{ evaluateDynamicExpression(node.LifeTime) }}</em> turns
      <template v-if="!node.LifeStepImmediately">
        <span class="minor">(Excluding current turn)</span>
      </template>
    </template>
    <template v-if="node.LifeStepImmediately">
      <span class="minor">(Including current turn)</span>
    </template>

    <template #content v-if="node.DynamicValues">
      <BlockLayout v-for="expression, key in node.DynamicValues" :source="expression">
        With <em :title="getHash(key.toString()).toString()">{{ key }}</em> set to <em>{{ evaluateDynamicExpression(expression) }}</em>
      </BlockLayout>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>