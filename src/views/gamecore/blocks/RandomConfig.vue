<script setup lang="ts">
  import { inject, Ref, } from 'vue';
  import { GamecoreNode, GamecoreContext, 
    DynamicExpression, evaluateDynamicExpression, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
import AnyBlock from '../AnyBlock.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    OddsList:DynamicExpression[]
    TaskList:GamecoreNode[]
  }
  const gamecoreContext = inject('gamecoreContext') as Ref<GamecoreContext>
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Random</span>
    <template #content>
      <template v-for="task, index in node.TaskList">
        <span class="flow"><em>{{ evaluateDynamicExpression(node.OddsList[index], gamecoreContext) }}</em>%</span>
        <AnyBlock :node="task" />
      </template>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>