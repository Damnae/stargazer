<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreTask, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    AbilityInherentTargetType?:GamecoreTargetType
    AbilityName:string
  }

  const createAbilityRoute = inject<(key:string) => object>('createAbilityRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">
   
    Trigger 
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s 
    </template>

    ability
    <RouterLink :to="createAbilityRoute(node.AbilityName)">
      <em>{{ node.AbilityName }}</em>
    </RouterLink>

    <template v-if="node.AbilityInherentTargetType">
      targeting <em>{{ evaluateTargetType(node.AbilityInherentTargetType) }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>