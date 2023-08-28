<script setup lang="ts">
  import { AbilityContext, } from '@/scripts/sources/ability';
  import { GamecoreNode, 
    DynamicExpression, evaluateDynamicExpression, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
import AnyBlock from '../AnyBlock.vue';

  const props = defineProps<{node:GamecoreNode, abilityContext:AbilityContext}>()
  const node = props.node as unknown as 
  {
    OddsList:DynamicExpression[]
    TaskList:GamecoreNode[]
  }
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Random</span>
    <template #content>
      <template v-for="task, index in node.TaskList">
        <span class="flow"><em>{{ evaluateDynamicExpression(node.OddsList[index]) }}</em>%</span>
        <AnyBlock :node="task" :abilityContext="abilityContext" />
      </template>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>