<script setup lang="ts">
  import { defineAsyncComponent, } from 'vue'
  import { GamecoreTask, } from '@/sources/gamecore';
  import { taskTypeToComponentName, } from '@/common/common';

  const props = defineProps<{node:GamecoreTask, withComponentName?:string}>()
  const taskName = props.withComponentName ?? taskTypeToComponentName(props.node?.$type ?? 'MissingTask')
  const taskComponent = defineAsyncComponent({
    loader: async () => 
    {
      try { return await import(`./tasks/${taskName}.vue`) }
      catch (error:any) 
      { 
        if (!error.toString().includes('Unknown variable dynamic import'))
          console.error(error)
        return await import(`./MissingTask.vue`)
      }
    },
  })
  const inversibleNode = props.node as unknown as 
  {
    Inverse:boolean
    InverseResultFlag:boolean
  }
</script>

<template>
  <component :is="taskComponent" :node="node" :class="inversibleNode?.Inverse || inversibleNode?.InverseResultFlag ? 'inverted' : ''" />
</template>

<style scoped>
</style>