<script setup lang="ts">
  import { inject } from 'vue';
  import translate, { Translatable } from '@/common/translate';
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Key:Translatable
  }

  const commitId = inject('commitId') as string
  translate(commitId, node.Key)
</script>

<template>
  <BlockLayout :source="node">
   
    Contains custom text "{{ node.Key.Text }}"

  </BlockLayout>
</template>

<style scoped>
</style>