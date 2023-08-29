<script setup lang="ts">
  import { GamecoreNode, 
    DynamicExpression, evaluateDynamicExpression, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import AnyBlock from '@/views/gamecore/AnyBlock.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    MaxLoopCount:DynamicExpression
    TaskList:GamecoreNode[]
  }

  const tasks = node.TaskList;
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Do {{ evaluateDynamicExpression(node.MaxLoopCount) }} times</span>
    <template #content>
      <template v-if="tasks && tasks.length > 0">
        <template v-for="n in tasks">
          <AnyBlock :node="n" />
        </template>
      </template>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>