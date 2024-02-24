<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    SummonerType:GamecoreTargetType
    ServantType:GamecoreTargetType
  }
</script>

<template>
  <BlockLayout :source="node">

    <em><EvaluateTargetType :target="node.ServantType" /></em> 
    is summoned by 
    <em><EvaluateTargetType :target="node.SummonerType" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>