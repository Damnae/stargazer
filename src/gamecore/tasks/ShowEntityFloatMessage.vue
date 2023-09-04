<script setup lang="ts">
  import { inject, } from 'vue';
  import { GamecoreTask,
    GamecoreTargetType, evaluateTargetType, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
import translate, { Translatable } from '@/common/translate';

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
      above <em>{{ evaluateTargetType(node.TargetType) }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>