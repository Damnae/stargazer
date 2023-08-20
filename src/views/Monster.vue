<script setup lang="ts">
  import { ref, watchEffect, inject, provide } from 'vue'
  import { getMonster, Monster, } from '../scripts/configsource.ts';
  
  const props = defineProps<{monsterId: number}>()
  provide<number>('monsterId', props.monsterId)

  const commitId = inject<string>('commitId', '')

  const monster = ref<Monster>(await getMonster(commitId, props.monsterId))
  watchEffect(async () => monster.value = await getMonster(commitId, props.monsterId))
</script>

<template>
  <section class="panel">
    <h1>{{ monster.MonsterName.Text }}</h1>
  </section>
</template>

<style scoped>
  section
  {
    flex-grow:1;
  }
</style>
