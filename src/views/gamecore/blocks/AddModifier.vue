<script setup lang="ts">
  import { inject } from 'vue';
  import { getHash } from '@/scripts/translate';
  import { GamecoreNode, 
    GamecoreTargetType, evaluateTargetType, 
    DynamicExpression, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
import useHashStore from '@/scripts/hashstore';

  const props = defineProps<{node:GamecoreNode}>()
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
  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
  
  if (node.DynamicValues)
  {
    const hashStore = useHashStore()
    for (const key of Object.keys(node.DynamicValues))
      hashStore.register(key)
  }
</script>

<template>
  <BlockLayout :source="node">

    Add modifier
    <RouterLink v-if="node.ModifierName" :to="createModifierRoute(node.ModifierName)">
      <em>{{ node.ModifierName }}</em>
    </RouterLink>

    <template v-if="node.TargetType">
      to <em>{{ evaluateTargetType(node.TargetType) }}</em>
    </template>
    <template v-if="node.Chance">
      with <em><EvaluateExpression :expression="node.Chance" /></em>% base chance
    </template>
    <template v-if="node.MaxLayer">
      with up to <em><EvaluateExpression :expression="node.MaxLayer" /></em> stacks
    </template>
    <template v-if="node.LifeTime">
      for <em><EvaluateExpression :expression="node.LifeTime" /></em> turns
      <template v-if="!node.LifeStepImmediately">
        <span class="minor">(Excluding current turn)</span>
      </template>
    </template>
    <template v-if="node.LifeStepImmediately">
      <span class="minor">(Including current turn)</span>
    </template>

    <template #content v-if="node.DynamicValues">
      <BlockLayout v-for="expression, key in node.DynamicValues" :source="expression">
        With <em :title="getHash(key.toString()).toString()">{{ key }}</em> set to <em><EvaluateExpression :expression="expression" /></em>
      </BlockLayout>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>