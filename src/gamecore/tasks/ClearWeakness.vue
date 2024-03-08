<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    OPType:string
    WeakList:string[]
  }
</script>

<template>
  <BlockLayout :source="node">

    <template v-if="node.WeakList">
      Clear
      <template v-if="node.TargetType">
        <em><EvaluateTargetType :target="node.TargetType" /></em>
      </template>
      {{ node.OPType ?? "Override" }} to <em>{{ node.WeakList.join(', ') }}</em>
    </template>
    <template v-else>
      Clear 
      <template v-if="node.TargetType">
        <em><EvaluateTargetType :target="node.TargetType" /></em>'s
      </template>
      weaknesses
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>