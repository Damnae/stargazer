<script setup lang="ts">
  import { inject, } from 'vue';
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import translate, { Translatable } from '@/common/translate';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ContentID?:Translatable
  }

  const commitId = inject('commitId') as string
  translate(commitId, node.ContentID)
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    
    Display "<em>{{ node.ContentID?.Text }}</em>"
    <template v-if="node.TargetType">
      above <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>