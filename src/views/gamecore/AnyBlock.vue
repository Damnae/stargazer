<script setup lang="ts">
  import { defineAsyncComponent, } from 'vue'
  import { AbilityContext, } from '@/scripts/sources/ability';
  import { GamecoreNode, } from '@/scripts/sources/gamecore';
  import { gamecoreToComponentName, } from '@/scripts/common';

  const props = defineProps<{node:GamecoreNode, abilityContext:AbilityContext}>()
  let blockName = gamecoreToComponentName(props.node.$type)
  const blockComponent = defineAsyncComponent({
    loader: async () => 
    {
      try { return await import(`./blocks/${blockName}.vue`) }
      catch (error:any) 
      { 
        if (!error.toString().includes('Unknown variable dynamic import'))
          console.error(error)
        return await import(`./MissingBlock.vue`)
      }
    },
    delay:0,
  })
</script>

<template>
  <component :is="blockComponent" :node="node" :abilityContext="abilityContext" />
</template>

<style scoped>
</style>