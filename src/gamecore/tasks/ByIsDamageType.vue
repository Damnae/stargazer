<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    DamageTypeList:string[]
  }
</script>

<template>
  <BlockLayout :source="node">

    Damage taken by <em><EvaluateTargetType :target="node.TargetType" /></em> 
    is <em>{{ node.DamageTypeList.join(', ') }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>