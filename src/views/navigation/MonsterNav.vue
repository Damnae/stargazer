<script setup lang="ts">
  import { ref, computed, inject, Ref, } from 'vue'
  import { RouterLink } from 'vue-router';
  import { Grouped2, } from '../../scripts/common.ts';
  import { getMonsters, Monster, MonsterConfig, } from '../../scripts/sources/monster.ts';

  const commitId = inject<string>('commitId') as string
  const search = inject<Ref<string>>('search') as Ref<string>

  const monsters = ref<MonsterConfig>(await getMonsters(commitId))
  const monstersSearchResults = computed(() => allMonstersByTemplateByCamp())

  function allMonsters() : Monster[]
  {
    return Object.values(monsters.value)
      .filter(v => v.MonsterName.Text.toLowerCase().includes(search.value.toLowerCase()))
      .sort((a, b) => a.MonsterName.Text > b.MonsterName.Text ? 1 : -1)
  }

  function allMonstersByTemplateByCamp() : Grouped2<Monster>
  {
    return allMonsters()
      .reduce((monsterCamps:Grouped2<Monster>, monster:Monster) => 
      {
        const campKey = monster.MonsterTemplate.MonsterCamp.Name.Text;
        const templateKey = monster.MonsterTemplate.MonsterName.Text;
        const monsterTemplates = (monsterCamps[campKey] || {});
        const monsters = (monsterTemplates[templateKey] || []);
        monsters.push(monster);
        monsterTemplates[templateKey] = monsters;
        monsterCamps[campKey] = monsterTemplates;
        return monsterCamps;
      }, {})
  }
</script>

<template>
  <ul>
    <template v-for="(monsterTemplate, monsterCampName) in monstersSearchResults">
      <li>

        <div>{{ monsterCampName }}</div>
        <ul>
          <template v-for="(monsters, monsterTemplateName) in monsterTemplate">
            <li>

              <div :title="monsterTemplateName.toString()">{{ monsterTemplateName }}</div>
              <ul>
                <template v-for="monster in monsters" :key="monster.MonsterID">
                  <li>
                    <RouterLink :to="{ name:'monster', params:{ commitId: commitId, objectId: monster.MonsterID }}">
                      <span :title="monster.MonsterName.Text">{{ monster.MonsterName.Text }}</span>
                    </RouterLink>
                  </li>
                </template>
              </ul>

            </li>
          </template>
        </ul>

      </li>
    </template>
  </ul>
</template>

<style scoped>
</style>