<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    AttackerTargetType?:GamecoreTargetType
    DefenderTargetType?:GamecoreTargetType
    StanceValue?:DynamicExpression
    StanceDamageType:
    {
      DamageType:string
    }
  }
</script>

<template>
  <BlockLayout :source="node">
    
     
    <template v-if="node.AttackerTargetType">
      Have <em><EvaluateTargetType :target="node.AttackerTargetType" /></em> deal 
    </template>
    <template v-else>
      Deal
    </template>

    <template v-if="node.StanceValue">
      <em><EvaluateExpression :expression="node.StanceValue" /></em>
    </template>
    toughness damage

    <template v-if="typeof(node.StanceDamageType?.DamageType) == 'string'">
      as <em>{{ node.StanceDamageType.DamageType }}</em>
    </template>
    
    <template v-if="node.DefenderTargetType">
      to <em><EvaluateTargetType :target="node.DefenderTargetType" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>