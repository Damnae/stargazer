<script setup lang="ts">
  import { inject } from 'vue';
  import { cleanupFilename, cleanupMarkup } from '@/common/common';
  import translate, { Translatable } from '@/common/translate';
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    AssetPath:string
    UITextNodes:
    [
      {
        TextPath:string
        TextContent:Translatable
      }
    ]
  }

  const commitId = inject('commitId') as string
  for (const page of node.UITextNodes)
    translate(commitId, page.TextContent)
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    Show <em>{{ cleanupFilename(node.AssetPath) }}</em> with text "{{ node.UITextNodes.map(p => cleanupMarkup(p.TextContent.Text)).join(', ') }}"

  </BlockLayout>
</template>

<style scoped>
</style>