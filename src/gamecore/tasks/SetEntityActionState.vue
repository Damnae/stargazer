<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    UniqueName?:string
    ActionState?:boolean
  }
</script>

<template>
  <BlockLayout :source="node">
    
    {{ node.ActionState === false ? "Disable" : "Enable" }}
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s
    </template>
    action
    <template v-if="node.UniqueName">
      with name <em>{{ node.UniqueName }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>