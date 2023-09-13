<script setup lang="ts">
  import { cleanupNumber } from '@/common/common';
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Predicate:GamecoreTask
    SuccessScore?:
    {
      Value:number
    }
  }
</script>

<template>
  <BlockLayout :source="node">

    <span class="flow">
      Predicate axis 
      <template v-if="node.SuccessScore">
        with Score <em>{{ cleanupNumber(node.SuccessScore.Value) }}</em>
      </template>
    </span>

    <template #content>
      <AnyTask :node="node.Predicate" />
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>