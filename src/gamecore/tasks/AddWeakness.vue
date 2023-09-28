<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    DamageType?:string
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Add a <em>{{ node.DamageType }}</em> weakness
    <template v-if="node.TargetType">
      to <em><EvaluateTargetType :target="node.TargetType" /></em>,
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>