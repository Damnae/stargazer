<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    OriginalAttackType:string
    RegardAttackType:string
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Change
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s
    </template>
    <em>{{ node.OriginalAttackType }}</em> attacks 
    to also be considered <em>{{ node.RegardAttackType }}</em> attacks.

  </BlockLayout>
</template>

<style scoped>
</style>