<script setup lang="ts">
  import { inject, } from 'vue';
  import { GamecoreNode,
    GamecoreTargetType, evaluateTargetType, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
import translate, { Translatable } from '@/scripts/translate';

  const props = defineProps<{node:GamecoreNode}>()
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