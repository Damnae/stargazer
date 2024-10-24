<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import ModifierLink from '@/gamecore/ModifierLink.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType:GamecoreTargetType
    ModifierName:string
    ModifierNameForStatus:string
  }
</script>

<template>
  <BlockLayout :source="node">

    Override
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s
    </template>
    <template v-if="node.ModifierName">
      <ModifierLink :modifierName="node.ModifierName" />'s
    </template>
    status name to 
    <template v-if="node.ModifierNameForStatus">
      <ModifierLink :modifierName="node.ModifierNameForStatus" />'s
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>