<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

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

  const createAbilityRoute = inject<(key:string) => object>('createAbilityRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">
   
    Insert extra turn action
    <RouterLink v-if="node.PrepareAbilityName" :to="createAbilityRoute(node.PrepareAbilityName)">
      with ability <em>{{ node.PrepareAbilityName }}</em>
    </RouterLink>
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