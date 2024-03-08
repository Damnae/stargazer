<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    CompareTargetType?:GamecoreTargetType
    MinOrMax:string
    PropertyType:string
  }
</script>

<template>
  <BlockLayout :source="node">
    
    <em><EvaluateTargetType :target="node.TargetType" /></em>
    has <em>{{ node.MinOrMax }}</em> 
    property <em>{{ node.PropertyType }}</em> 
    in <em><EvaluateTargetType :target="node.CompareTargetType" /></em>

  </BlockLayout>
</template>

<style scoped>
</style>