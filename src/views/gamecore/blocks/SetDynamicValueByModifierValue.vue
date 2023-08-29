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
    ReadTargetType?:GamecoreTargetType
    ModifierName:string
    DynamicKey:string
    ValueType?:string
    Multiplier?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Set <em>{{ node.DynamicKey }}</em>

    to 
    <template v-if="node.ReadTargetType">
      {{ evaluateTargetType(node.ReadTargetType) }}'s
    </template>
    <RouterLink :to="{  }">
      <em>{{ node.ModifierName }}</em>
    </RouterLink>
    (Multiplied by <em><EvaluateExpression :expression="node.Multiplier" /></em>)

  </BlockLayout>
</template>

<style scoped>
</style>