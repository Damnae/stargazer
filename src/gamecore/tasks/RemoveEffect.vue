<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    UniqueEffectName:string
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    Remove visual effect
    <template v-if="node.UniqueEffectName">
      <em>{{ node.UniqueEffectName }}</em>
    </template>
    <template v-if="node.TargetType">
      from <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>