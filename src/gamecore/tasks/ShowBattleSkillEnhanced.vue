<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    SkillType?:string
    IsShow?:boolean
  }
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
    
    Change
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s
    </template>
    <em>{{ node.SkillType ?? "Basic ATK" }}</em>
    to {{ node.IsShow ? "enhanced" : "normal" }} mode

  </BlockLayout>
</template>

<style scoped>
</style>