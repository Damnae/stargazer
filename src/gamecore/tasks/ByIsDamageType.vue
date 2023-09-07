<script setup lang="ts">
  import { GamecoreTask, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    DamageTypeList:string[]
  }
</script>

<template>
  <BlockLayout :source="node">

    Damage taken by <em>{{ evaluateTargetType(node.TargetType) }}</em> 
    is <em>{{ node.DamageTypeList.join(', ') }}</em>

  </BlockLayout>
</template>

<style scoped>
</style>