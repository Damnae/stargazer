<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Target?:GamecoreTargetType
    Enable?:boolean
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    
    {{ node.Enable ? "Allow" : "Disallow" }} auto battle to use Ultimate skills
    <template v-if="node.Target">
      on <em><EvaluateTargetType :target="node.Target" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>