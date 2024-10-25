<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import ModifierLink from '@/gamecore/ModifierLink.vue';
  import DynamicKey from '@/gamecore/DynamicKey.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ReadTargetType?:GamecoreTargetType
    ModifierName:string
    ContextScope:string
    DynamicKey:string
    ValueType?:string
    Multiplier?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Set <DynamicKey :dynamicKey="node.DynamicKey" :contextScope="node.ContextScope" />

    to <em><EvaluateExpression :expression="node.Multiplier" /></em>× of
    <template v-if="node.ModifierName">
      <ModifierLink :modifierName="node.ModifierName" />'s
    </template>
    <template v-else>
      this modifier's
    </template>
    <em>{{ node.ValueType ?? 'Count' }}</em>
    <template v-if="node.ReadTargetType">
      on <em><EvaluateTargetType :target="node.ReadTargetType" /></em>
    </template>


  </BlockLayout>
</template>

<style scoped>
</style>