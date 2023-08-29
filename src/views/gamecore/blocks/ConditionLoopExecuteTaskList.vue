<script setup lang="ts">
  import { GamecoreNode, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import AnyBlock from '@/views/gamecore/AnyBlock.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    Predicate:GamecoreNode
    TaskList:GamecoreNode[]
  }

  const predicate = node.Predicate;
  const tasks = node.TaskList;
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">While</span>
    <template #content>
      
      <AnyBlock :node="predicate" />

      <div class="subblock">
        <template v-if="tasks && tasks.length > 0">
          <span class="flow">Do</span>
          <template v-for="n in tasks">
            <AnyBlock :node="n" />
          </template>
        </template>
      </div>

    </template>
  </BlockLayout>
</template>

<style scoped>
</style>