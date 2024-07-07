<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    CasterFilter?:GamecoreTargetType
    Flag:string
  }
</script>

<template>
  <BlockLayout :source="node">

    <em><EvaluateTargetType :target="node.TargetType" /></em>
    has <em>{{ node.Flag }}</em> flag
    <template v-if="node.CasterFilter">
      applied by <em><EvaluateTargetType :target="node.CasterFilter" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>