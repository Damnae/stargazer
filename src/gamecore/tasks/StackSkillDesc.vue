<script setup lang="ts">
  import { inject } from 'vue';
  import { cleanupMarkup } from '@/common/common';
  import translate, { Translatable } from '@/common/translate';
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    SkillName:string
    OverrideSimpleDescTextID:Translatable
  }

  const commitId = inject('commitId') as string
  translate(commitId, node.OverrideSimpleDescTextID)
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    Change <em>{{ node.SkillName }}</em>'s description to "{{ cleanupMarkup(node.OverrideSimpleDescTextID.Text) }}"

  </BlockLayout>
</template>

<style scoped>
</style>