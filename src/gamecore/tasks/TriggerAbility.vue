<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import AbilityLink from '../AbilityLink.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    AbilityInherentTargetType?:GamecoreTargetType
    AbilityName:string
  }
</script>

<template>
  <BlockLayout :source="node">
   
    Trigger 
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s 
    </template>

    ability
    <AbilityLink :abilityName="node.AbilityName" />

    <template v-if="node.AbilityInherentTargetType">
      targeting <em><EvaluateTargetType :target="node.AbilityInherentTargetType" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>