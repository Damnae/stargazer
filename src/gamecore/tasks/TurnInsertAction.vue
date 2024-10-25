<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import AbilityLink from '../AbilityLink.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    PrepareAbilityName?:string
    Priority?:number
    SkillType?:string
    PlayReadyCamera?:boolean
    CanInsertUltraSkill?:boolean
    SkillTypeWhenDelayed?:string
  }
</script>

<template>
  <BlockLayout :source="node">
   
    Insert extra turn action
    <template v-if="node.PrepareAbilityName">
      with ability <AbilityLink :abilityName="node.PrepareAbilityName" />
    </template>
    <template v-if="node.TargetType">
      for <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>
    <template v-if="!node.CanInsertUltraSkill">
      <span class="minor">(Prevent ultimate use)</span>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>