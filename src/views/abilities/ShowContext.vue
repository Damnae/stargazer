<script setup lang="ts">
  import { Ref, inject } from 'vue';
  import { AbilityContext } from '@/scripts/sources/ability';
  import { GamecoreContext } from '@/scripts/sources/gamecore';
  import BlockLayout from '../gamecore/BlockLayout.vue';
  
  const gamecoreContext = inject('gamecoreContext') as Ref<GamecoreContext>
  const abilityContext = inject('abilityContext') as Ref<AbilityContext>
</script>

<template>
  <BlockLayout :source="gamecoreContext">
    <span class="flow">Expression Context</span>
  </BlockLayout>
  <BlockLayout :source="abilityContext.TaskListTemplates">
    <span class="flow">Task Templates</span>
  </BlockLayout>
</template>

<style scoped>
</style>