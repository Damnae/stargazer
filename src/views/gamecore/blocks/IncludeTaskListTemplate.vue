<script setup lang="ts">
  import { Ref, inject, watch, ref } from 'vue';
  import { GamecoreContext, GamecoreNode, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import { AbilityContext, TaskListTemplate, findTaskTemplate, } from '@/scripts/sources/ability';
  import AnyBlock from '../AnyBlock.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    Name:string
  }

  const gamecoreContext = inject('gamecoreContext') as Ref<GamecoreContext>
  const abilityContext = inject('abilityContext') as Ref<AbilityContext>

  const taskTemplate = ref<TaskListTemplate>()
  watch([gamecoreContext, abilityContext], () =>
  {
    taskTemplate.value = findTaskTemplate(node.Name, gamecoreContext.value, abilityContext.value)
  },
  { immediate:true })
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">
      Include task list template 
      <em>{{ node.Name }}</em>
    </span>
    <template #content v-if="taskTemplate">
      <AnyBlock v-for="task in taskTemplate.TaskList" :node="task" />
    </template>
    <template #content v-else>
      <div class="subblock">
        Not found
      </div>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>