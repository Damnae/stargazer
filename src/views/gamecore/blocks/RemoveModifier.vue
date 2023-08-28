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
    ModifierName:string
  }
</script>

<template>
  <BlockLayout :source="node">

    Remove modifier
    <RouterLink :to="{  }">
      <em>{{ node.ModifierName }}</em>
    </RouterLink>

    <template v-if="node.TargetType">
      from <em>{{ evaluateTargetType(node.TargetType) }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>