<script setup lang="ts">
  import { AbilityContext, } from '@/scripts/sources/ability';
  import { GamecoreNode, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode, abilityContext:AbilityContext}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    AbilityName:string
  }
</script>

<template>
  <BlockLayout :node="node">
   
    Trigger 
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s 
    </template>

    ability
    <RouterLink :to="{  }">
      <em>{{ node.AbilityName }}</em>
    </RouterLink>

  </BlockLayout>
</template>

<style scoped>
</style>