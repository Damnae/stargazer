<script setup lang="ts">
  import { ref, inject } from 'vue'
  import { RouterLink } from 'vue-router';
  import { 
    getAvatars, AvatarConfig, Avatar, GroupedAvatars,
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

  function allAvatarsByDamageType() : GroupedAvatars
  {
    return allAvatars()
      .reduce((groups:GroupedAvatars, avatar:Avatar) => 
      {
        const group = (groups[avatar.DamageType] || []);
        group.push(avatar);
        groups[avatar.DamageType] = group;
        return groups;
      }, {})
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

    <h1>{{ Object.keys(avatars).length }} Avatars</h1>
    <ul>
      <template v-for="avatarGroup in allAvatarsByDamageType()">
        <li>
          {{ avatarGroup[0].DamageType }}
          <ul>
            <template v-for="avatar in avatarGroup" :key="avatar.AvatarID">
              <li>
                <RouterLink :to="{ name:'avatar', params:{ commitId: commitId, avatarId: avatar.AvatarID }}">
                  {{ avatar.AvatarName.Text ?? avatar.AvatarID }}
                </RouterLink>
              </li>
            </template>
          </ul>
        </li>
      </template>
    </ul>

    <h1>{{ Object.keys(monsters).length }} Monsters</h1>
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
