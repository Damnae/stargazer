<script setup lang="ts">
  import { ref, inject } from 'vue'
  import { RouterLink } from 'vue-router';
  import { 
    getAvatars, AvatarConfig, Avatar,
    getMonsterCamps, MonsterCampConfig, MonsterCamp,
    getMonsterTemplates, MonsterTemplateConfig, MonsterTemplate,
    getMonsters, MonsterConfig, Monster,
  } from '../scripts/configsource.ts';

  const commitId = inject<string>('commitId', '')

  const avatars = ref<AvatarConfig>(await getAvatars(commitId))
  const monsterCamps = ref<MonsterCampConfig>(await getMonsterCamps(commitId))
  const monsterTemplates = ref<MonsterTemplateConfig>(await getMonsterTemplates(commitId))
  const monsters = ref<MonsterConfig>(await getMonsters(commitId))

  const search = ref<string>('')

  function allAvatars() : Avatar[]
  {
    return Object.values(avatars.value)
      .sort((a, b) => a.AvatarName.Text > b.AvatarName.Text ? 1 : -1)
  }

  function allMonsterCamps() : MonsterCamp[]
  {
    return Object.values(monsterCamps.value)
      .sort(v => v.AtlasSortID)
  }

  function allMonsterTemplatesInCamp(monsterCampID:number) : MonsterTemplate[]
  {
    return Object.values(monsterTemplates.value)
      .filter(v => v.MonsterCampID == monsterCampID)
      .sort(v => -v.AtlasSortID)
  }

  function allMonstersInTemplate(monsterTemplateID:number) : Monster[]
  {
    return Object.values(monsters.value)
      .filter(v => v.MonsterTemplateID == monsterTemplateID)
      .sort((a, b) => a.MonsterName.Text > b.MonsterName.Text ? 1 : -1)
  }
</script>

<template>
  <nav class="panel">

    <input v-model.trim="search" placeholder="Search" />

    <h2>{{ Object.keys(avatars).length }} Avatars</h2>
    <ul>
      <li v-for="avatar in allAvatars()" :key="avatar.AvatarID">
        <RouterLink :to="{ name:'avatar', params:{ commitId: commitId, avatarId: avatar.AvatarID }}">
          {{ avatar.AvatarName.Text ?? avatar.AvatarID }}
        </RouterLink>
      </li>
    </ul>

    <h2>{{ Object.keys(monsters).length }} Monsters</h2>
    <ul>
      <template v-for="monsterCamp in allMonsterCamps()" :key="monsterCamp.ID">
        <li>
          
          {{ monsterCamp.Name.Text ?? monsterCamp.ID }}
          <ul>
            <template v-for="monsterTemplate in allMonsterTemplatesInCamp(monsterCamp.ID)" :key="monsterTemplate.MonsterTemplateID">
              <li>
                
                {{ monsterTemplate.MonsterName.Text ?? monsterTemplate.MonsterTemplateID }}
                <ul>
                  <template v-for="monster in allMonstersInTemplate(monsterTemplate.MonsterTemplateID)" :key="monster.MonsterID">
                    <li>
                      <RouterLink :to="{ name:'monster', params:{ commitId: commitId, monsterId: monster.MonsterID }}">
                        {{ monster.MonsterName.Text ?? monster.MonsterID }}
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

    <pre v-if="false">{{ monsters }}</pre>
  </nav>
</template>

<style scoped>
  nav
  {
    width:22rem;
    flex-shrink:0;
  }
</style>
