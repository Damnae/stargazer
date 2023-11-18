<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    DamageType:string
  }
</script>

<template>
  <BlockLayout :source="node">

    <em><EvaluateTargetType :target="node.TargetType" /></em>'s element is <em>{{ node.DamageType }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>