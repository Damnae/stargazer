<script setup lang="ts">
  import { inject } from 'vue';
  import { cleanupMarkup } from '@/common/common';
  import translate, { Translatable } from '@/common/translate';
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TitleTextID:Translatable
  }

  const commitId = inject('commitId') as string
  translate(commitId, node.TitleTextID)
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    Show bonus action "{{ cleanupMarkup(node.TitleTextID.Text) }}"

  </BlockLayout>
</template>

<style scoped>
</style>