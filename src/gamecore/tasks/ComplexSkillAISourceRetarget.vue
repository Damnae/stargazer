<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Evaluator:GamecoreTask
    Retarget?:string
    TeamTypeMask:string
  }
</script>

<template>
  <BlockLayout :source="node">

    <span class="flow">
      Retarget
      <template v-if="node.Retarget">
        <em>{{ node.Retarget }}</em>
      </template>
      in <em>{{ node.TeamTypeMask }}</em>
    </span>
    <template #content>
      <AnyTask :node="node.Evaluator" />
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>