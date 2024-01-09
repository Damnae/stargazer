<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType:GamecoreTargetType
    CasterFilter?:GamecoreTargetType
    ModifierName:string
    AddBehaviorFlags:string[]
  }

  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">

    Add <em>{{ node.AddBehaviorFlags.join(", ") }}</em> flag to
    <RouterLink v-if="node.ModifierName" :to="createModifierRoute(node.ModifierName)">
      <em>{{ node.ModifierName }}</em>
    </RouterLink>
    <template v-if="node.CasterFilter">
      applied by <em><EvaluateTargetType :target="node.CasterFilter" /></em>
    </template>
    <template v-if="node.TargetType">
      on <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>