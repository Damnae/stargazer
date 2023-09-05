<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Enable:boolean
    AllowSkillType:string[]
  }

</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    {{ node.Enable ? 'Show' : 'Hide' }} special skill mark
    <template v-if="node.AllowSkillType">
      for <em>{{ node.AllowSkillType.join(', ') }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>