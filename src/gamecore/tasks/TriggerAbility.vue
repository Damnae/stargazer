<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

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
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s 
    </template>

    ability
    <RouterLink :to="createAbilityRoute(node.AbilityName)">
      <em>{{ node.AbilityName }}</em>
    </RouterLink>

    <template v-if="node.AbilityInherentTargetType">
      targeting <em><EvaluateTargetType :target="node.AbilityInherentTargetType" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>