<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ModifierBehaviorFlags:string[]
  }
</script>

<template>
  <BlockLayout :source="node">

    Remove modifiers with flag <em>{{ node.ModifierBehaviorFlags.join(', ') }}</em>
    <template v-if="node.TargetType">
      from <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>