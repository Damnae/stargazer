<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getMonster, Monster, } from '../scripts/configsource.ts';
  
  const props = defineProps<{commitId:string, monsterId: number}>()

  const monster = ref<Monster>(await getMonster(props.commitId, props.monsterId))
  watchEffect(async () => 
  {
    monster.value = await getMonster(props.commitId, props.monsterId)
  })
</script>

<template>
  <h1>{{ monster.MonsterName.Text }}</h1>
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
  h1 
  {
    margin:0;
  }
</style>
