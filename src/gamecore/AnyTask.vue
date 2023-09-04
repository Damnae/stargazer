<script setup lang="ts">
  import { defineAsyncComponent, } from 'vue'
  import { GamecoreTask, } from '@/sources/gamecore';
  import { taskTypeToComponentName, } from '@/common/common';

  const props = defineProps<{node:GamecoreTask}>()
  const taskName = taskTypeToComponentName(props.node.$type)
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
  }
</script>

<template>
  <component :is="taskComponent" :node="node" :class="inversibleNode.Inverse ? 'inverted' : ''" />
</template>

<style scoped>
</style>