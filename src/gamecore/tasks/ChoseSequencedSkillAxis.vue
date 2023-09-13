<script setup lang="ts">
  import { cleanupNumber } from '@/common/common';
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    CheckScore?:
    {
      Value:number
    }
  }
</script>

<template>
  <BlockLayout :source="node">

    <span class="flow">
      Choose sequenced skill axis
      <template v-if="node.CheckScore">
        with Score <em>{{ cleanupNumber(node.CheckScore.Value) }}</em>
      </template>
    </span>

  </BlockLayout>
</template>

<style scoped>
</style>