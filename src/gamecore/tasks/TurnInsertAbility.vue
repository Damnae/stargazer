<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import AnyTask from '../AnyTask.vue';
  import AbilityLink from '../AbilityLink.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    AbilityTarget?:GamecoreTargetType
    AbilityName:string
    AbortBehaviorFlags:string[]
    InsertAbilityPriority:string
    ShowInActionBar:boolean
    PreCheck?:GamecoreTask
  }
</script>

<template>
  <BlockLayout :source="node">
   
    Insert ability
    <AbilityLink :abilityName="node.AbilityName" />
    <template v-if="node.TargetType">
      for <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>
    <template v-if="node.AbilityTarget">
      targeting <em><EvaluateTargetType :target="node.AbilityTarget" /></em>
    </template>
    <template v-if="node.InsertAbilityPriority">
      with priority <em>{{ node.InsertAbilityPriority }}</em>
    </template>

    <template #content>
      <template v-if="node.PreCheck">
        <AnyTask :node="node.PreCheck" />
      </template>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>