<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import ModifierLink from '@/gamecore/ModifierLink.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType:GamecoreTargetType
    CasterFilter?:GamecoreTargetType
    ModifierName:string
    RemoveBehaviorFlags:string[]
  }
</script>

<template>
  <BlockLayout :source="node">

    Remove <em>{{ node.RemoveBehaviorFlags.join(", ") }}</em> flag from
    <ModifierLink :modifierName="node.ModifierName" />
    <template v-if="node.CasterFilter">
      applied by <em><EvaluateTargetType :target="node.CasterFilter" /></em>
    </template>
    <template v-if="node.TargetType">
      on <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>