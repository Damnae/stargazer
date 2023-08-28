<script setup lang="ts">
  import { AbilityContext, } from '@/scripts/sources/ability';
  import { GamecoreNode, 
    DynamicExpression, evaluateDynamicExpression, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import AnyBlock from '@/views/gamecore/AnyBlock.vue';

  const props = defineProps<{node:GamecoreNode, abilityContext:AbilityContext}>()
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
          <AnyBlock :node="n" :abilityContext="abilityContext" />
        </template>
      </template>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>