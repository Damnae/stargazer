<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    AbilityTarget?:GamecoreTargetType
    AbilityName:string
    AbortBehaviorFlags:string[]
    InsertAbilityPriority:string
    ShowInActionBar:boolean
  }

  const createAbilityRoute = inject<(key:string) => object>('createAbilityRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">
   
    Insert ability
    <RouterLink :to="createAbilityRoute(node.AbilityName)">
      <em>{{ node.AbilityName }}</em>
    </RouterLink>

    <template v-if="node.TargetType">
      for <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>
    <template v-if="node.AbilityTarget">
      targeting <em><EvaluateTargetType :target="node.AbilityTarget" /></em>
    </template>

    <template v-if="node.InsertAbilityPriority">
      with priority <em>{{ node.InsertAbilityPriority }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>