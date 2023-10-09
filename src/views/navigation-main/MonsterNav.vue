<script setup lang="ts">
  import { ref, computed, inject, Ref, } from 'vue'
  import { RouterLink } from 'vue-router';
  import { Grouped, } from '@/common/common';
  import { getMonsters, Monster, MonsterConfig, } from '@/sources/monster';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'

  const commitId = inject<string>('commitId') as string
  const search = inject<Ref<string>>('search') as Ref<string>

  const monsters = ref<MonsterConfig>(await getMonsters(commitId))
  const monstersSearchResults = computed(() => allMonstersByTemplate())

  function allMonsters() : Monster[]
  {
    return Object.values(monsters.value)
      .filter(v => v.SearchKeywords.some(k => k.includes(search.value.toLowerCase())))
      .sort((a, b) => a.MonsterName.Text > b.MonsterName.Text ? 1 : -1)
  }

  function allMonstersByTemplate() : Grouped<Monster>
  {
    return allMonsters()
      .reduce((monsterNames:Grouped<Monster>, monster:Monster) => 
      {
        const key = monster.MonsterTemplate.MonsterName.Text;
        const monsters = (monsterNames[key] || []);
        monsters.push(monster);
        monsterNames[key] = monsters;
        return monsterNames;
      }, {})
  }
</script>

<template>
  <NavItem v-for="(monsters, monsterTemplateName) in monstersSearchResults">
    <NavTree>
      <template #header :title="monsterTemplateName.toString()">{{ monsterTemplateName }}</template>
      <NavItem v-for="monster in monsters" :key="monster.MonsterID">
        <RouterLink :to="{ name:'monster', params:{ commitId: commitId, objectId: monster.MonsterID }}">
          <span :title="monster.MonsterName.Text">{{ monster.MonsterName.Text }}</span>
        </RouterLink>
      </NavItem>
    </NavTree>
  </NavItem>
</template>

<style scoped>
</style>