<script setup lang="ts">
  import { GamecoreTargetType, GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Team?:string
    FormationTarget?:GamecoreTargetType
    FormationType:string
    CustomFormationName:string
  }

</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    Change 
    <template v-if="node.Team">
      <em>{{ node.Team }}</em>'s
    </template> 
    <template v-if="node.FormationTarget">
      <em><EvaluateTargetType :target="node.FormationTarget" /></em>'s
    </template> 
    formation to <em>{{ node.FormationType ?? node.CustomFormationName }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>