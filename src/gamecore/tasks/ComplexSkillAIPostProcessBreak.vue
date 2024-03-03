<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    CompareType:string
    CompareValue:{ Value: number }
    IsOverrideFinalScore:boolean
    FinalScore:{ Value: number }
  }
</script>

<template>
  <BlockLayout :source="node">

    Break if the value is <em>{{ node.CompareType }}</em> to <em>{{ node.CompareValue?.Value ?? "0" }}</em>
    <template v-if="node.IsOverrideFinalScore">
      and override the score to <em>{{ node.FinalScore?.Value ?? "0" }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>