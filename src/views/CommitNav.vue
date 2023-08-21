<script setup lang="ts">
  import { ref, computed, inject } from 'vue'
  import { RouterLink } from 'vue-router';
  import { 
    getAvatars, AvatarConfig, Avatar, GroupedAvatars,
    getMonsterCamps, MonsterCampConfig, MonsterCamp,
    getMonsterTemplates, MonsterTemplateConfig, MonsterTemplate,
    getMonsters, MonsterConfig, Monster, GroupedMonsters,
  } from '../scripts/configsource.ts';

  const commitId = inject<string>('commitId', '')

  const avatars = ref<AvatarConfig>(await getAvatars(commitId))
  const monsterCamps = ref<MonsterCampConfig>(await getMonsterCamps(commitId))
  const monsterTemplates = ref<MonsterTemplateConfig>(await getMonsterTemplates(commitId))
  const monsters = ref<MonsterConfig>(await getMonsters(commitId))

  const search = ref<string>('')
  const avatarsSearchResults = computed(() => allAvatarsByDamageType())
  const monstersSearchResults = computed(() => allMonstersByTemplateByCamp())

  function allAvatars() : Avatar[]
  {
    return Object.values(avatars.value)
      .filter(v => v.AvatarName.Text.toLowerCase().includes(search.value.toLowerCase()))
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

  function allMonsters() : Monster[]
  {
    return Object.values(monsters.value)
      .filter(v => v.MonsterName.Text.toLowerCase().includes(search.value.toLowerCase()))
      .sort((a, b) => a.MonsterName.Text > b.MonsterName.Text ? 1 : -1)
  }

  function allMonstersByTemplateByCamp() : GroupedMonsters
  {
    return allMonsters()
      .reduce((groups:GroupedMonsters, monster:Monster) => 
      {
        const templateName = monsterTemplates.value[monster.MonsterTemplateID].MonsterName.Text
        const group = (groups[templateName] || []);
        group.push(monster);
        groups[templateName] = group;
        return groups;
      }, {})
  }

  function allMonsterCamps() : MonsterCamp[]
  {
    return Object.values(monsterCamps.value)
      .sort((a, b) => a.AtlasSortID > b.AtlasSortID ? 1 : -1)
  }

  function allMonsterTemplatesInCamp(monsterCampID:number) : MonsterTemplate[]
  {
    return Object.values(monsterTemplates.value)
      .filter(v => v.MonsterCampID == monsterCampID)
      .sort((a, b) => a.AtlasSortID > b.AtlasSortID ? 1 : -1)
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

    <section class="mainnav">
      <input v-model.trim="search" placeholder="Search" />

      <ul class="navtree">
        <li>
          <div>Avatars</div>
          <ul>
            <template v-for="avatarGroup in avatarsSearchResults">
              <li>
                
                <div>{{ avatarGroup[0].DamageType }}</div>
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

        </li>
        <li>

          <div>Monsters</div>
          <ul>
            <template v-for="monsterCamp in allMonsterCamps()" :key="monsterCamp.ID">
              <li>
                
                <div>{{ monsterCamp.Name.Text ?? monsterCamp.ID }}</div>
                <ul>
                  <template v-for="monsterTemplate in allMonsterTemplatesInCamp(monsterCamp.ID)" :key="monsterTemplate.MonsterTemplateID">
                    <li>
                      
                      <div>{{ monsterTemplate.MonsterName.Text ?? monsterTemplate.MonsterTemplateID }}</div>
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

        </li>
      </ul>
      <pre v-if="false">{{ monsters }}</pre>
    </section>
    <hr />
    <section class="subnav">
      <slot />
    </section>
  </nav>
</template>

<style scoped>
  nav
  {
    width:20rem;
    flex-shrink:0;

    display:flex;
    flex-direction: column;
  }
  .mainnav
  {
    height:20rem;
    display:flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
  }
  .subnav
  {
    flex-grow: 1;
    flex-shrink: 1;
    overflow:auto scroll;
    scrollbar-width: thin;
  }
  nav > hr
  {
    width:100%;
    border:1px solid #242424;
    flex-grow: 0;
    flex-shrink: 0;
  }
</style>
