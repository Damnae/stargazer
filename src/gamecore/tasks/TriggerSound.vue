<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    SoundName:string|{
      Value:string
    }
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    
    Play sound 
    <template v-if="typeof(node.SoundName) == 'string'">
      <em>{{ node.SoundName }}</em>
    </template>
    <template v-else>
      <em>{{ node.SoundName.Value }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>