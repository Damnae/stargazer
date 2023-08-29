<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreNode, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode}>()
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
   
    Insert 
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s 
    </template>

    ability
    <RouterLink :to="createAbilityRoute(node.AbilityName)">
      <em>{{ node.AbilityName }}</em>
    </RouterLink>

    <template v-if="node.AbilityTarget">
      targeting <em>{{ evaluateTargetType(node.AbilityTarget) }}</em>
    </template>

    <template v-if="node.InsertAbilityPriority">
      with priority <em>{{ node.InsertAbilityPriority }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>