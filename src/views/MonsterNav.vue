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
  <h1>{{ monster.MonsterName.Text ?? monster.MonsterID }}</h1>
  <ul class="navtree">
    <li>
      <div>Skills</div>
      <ul>
        <template v-for="skillId in monster.SkillList">
          <li>{{ skillId }}</li>
        </template>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
</style>
