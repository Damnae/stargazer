<script setup lang="ts">
  import { cleanupFilename } from '@/common/common';
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    UniqueEffectName?:string
    EffectPath?:string
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    Create visual effect 
    <template v-if="node.EffectPath">
      <em>{{ cleanupFilename(node.EffectPath) }}</em>
    </template>
    <template v-if="node.UniqueEffectName">
      as <em>{{ node.UniqueEffectName }}</em>
    </template>
    <template v-if="node.TargetType">
      at <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>