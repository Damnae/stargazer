<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import translate, { Translatable } from '@/common/translate';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    Key:Translatable
  }

  const commitId = inject('commitId') as string
  translate(commitId, node.Key)
</script>

<template>
  <BlockLayout :source="node">
    <em><EvaluateTargetType :target="node.TargetType" /></em> has custom flag <em>{{ node.Key.Text ?? node.Key.Hash }}</em>
  </BlockLayout>
</template>

<style scoped>
</style>