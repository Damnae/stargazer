<script setup lang="ts">
  import { inject } from 'vue';
  import { cleanupMarkup } from '@/common/common';
  import translate, { Translatable } from '@/common/translate';
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ContentID:Translatable
  }

  const commitId = inject('commitId') as string
  translate(commitId, node.ContentID)
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    Show battle message "{{ cleanupMarkup(node.ContentID.Text) }}"

  </BlockLayout>
</template>

<style scoped>
</style>