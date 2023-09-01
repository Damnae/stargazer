<script setup lang="ts">
  import { Ref, inject } from 'vue';
  import { GamecoreContext } from '@/scripts/sources/gamecore';
  import BlockLayout from '../gamecore/BlockLayout.vue';
  
  const gamecoreContext = inject('gamecoreContext') as Ref<GamecoreContext>
</script>

<template>
  <BlockLayout :source="gamecoreContext">
    <span class="flow">Expression Context</span>
  </BlockLayout>
</template>

<style scoped>
</style>