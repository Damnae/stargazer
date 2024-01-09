<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType:GamecoreTargetType
    ModifierName:string
    ModifierNameForStatus:string
  }

  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">

    Override
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s
    </template>
    <RouterLink v-if="node.ModifierName" :to="createModifierRoute(node.ModifierName)">
      <em>{{ node.ModifierName }}</em>
    </RouterLink>'s
    status name to 
    <RouterLink v-if="node.ModifierNameForStatus" :to="createModifierRoute(node.ModifierNameForStatus)">
      <em>{{ node.ModifierNameForStatus }}</em>
    </RouterLink>

  </BlockLayout>
</template>

<style scoped>
</style>