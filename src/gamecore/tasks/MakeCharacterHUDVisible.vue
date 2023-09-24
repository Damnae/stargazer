<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    Visible?:boolean
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    {{ node.Visible ? 'Show' : 'Hide' }}
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s 
    </template>
    character HUD

  </BlockLayout>
</template>

<style scoped>
</style>