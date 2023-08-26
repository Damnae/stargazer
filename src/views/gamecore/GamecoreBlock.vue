<script setup lang="ts">
  import { defineAsyncComponent, } from 'vue'
  import { AbilityContext, } from '@/scripts/sources/ability';
  import { GamecoreNode, } from '@/scripts/sources/gamecore';
  import { gamecoreToComponentName, } from '@/scripts/common';

  const props = defineProps<{node:GamecoreNode, abilityContext:AbilityContext}>()

  let blockName = gamecoreToComponentName(props.node.$type)
  const blockComponent = defineAsyncComponent(async () => {
    try { return await import(`./blocks/${blockName}.vue`) } 
    catch (_error) { return await import(`./MissingBlock.vue`)}
  })
</script>

<template>
  <component :is="blockComponent" :node="node" :abilityContext="abilityContext"></component>
  <pre>{{ node }}</pre>
</template>

<style scoped>
</style>