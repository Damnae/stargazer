<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetPropertyType:string
    CompareType:string
    CompareValue:
    {
      Value:number
    }
  }
</script>

<template>
  <BlockLayout :source="node">

    {{ node.TargetPropertyType }} 
    <template v-if="node.CompareType">
      is <em>{{ node.CompareType }}</em> 
      to <em>{{ node.CompareValue?.Value ?? 0 }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>