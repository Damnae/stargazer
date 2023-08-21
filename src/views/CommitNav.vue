<script setup lang="ts">
  import { ref, computed, inject } from 'vue'
  import { RouterLink } from 'vue-router';
  //import { sortByKeys } from '../scripts/common.ts';
  import { 
    getAvatars, Avatar, AvatarConfig, 
    getMonsters, Monster, MonsterConfig, 
    Grouped,
  } from '../scripts/configsource.ts';

  const commitId = inject<string>('commitId', '')

  const avatars = ref<AvatarConfig>(await getAvatars(commitId))
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

  function allAvatarsByDamageType() : Grouped<Avatar>
  {
    return allAvatars()
      .reduce((groups:Grouped<Avatar>, avatar:Avatar) => 
      {
        const key = avatar.DamageType;
        const group = (groups[key] || []);
        group.push(avatar);
        groups[key] = group;
        return groups;
      }, {})
  }

  function allMonsters() : Monster[]
  {
    return Object.values(monsters.value)
      .filter(v => v.MonsterName.Text.toLowerCase().includes(search.value.toLowerCase()))
      .sort((a, b) => a.MonsterName.Text > b.MonsterName.Text ? 1 : -1)
  }

  function allMonstersByTemplateByCamp() : Grouped<Monster>
  {
    return allMonsters()
      .reduce((groups:Grouped<Monster>, monster:Monster) => 
      {
        const key = monster.MonsterTemplate.MonsterName.Text;
        const group = (groups[key] || []);
        group.push(monster);
        groups[key] = group;
        return groups;
      }, {})
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
            <template v-for="(avatarGroup, avatarGroupKey) in avatarsSearchResults">
              <li>
                
                <div>{{ avatarGroupKey }}</div>
                <ul>
                  <template v-for="avatar in avatarGroup" :key="avatar.AvatarID">
                    <li>
                      <RouterLink :to="{ name:'avatar', params:{ commitId: commitId, avatarId: avatar.AvatarID }}">
                        {{ avatar.AvatarName.Text }}
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
            <template v-for="(monsterGroup, monsterGroupKey) in monstersSearchResults">
              <li>
                
                <div>{{ monsterGroupKey }}</div>
                <ul>
                  <template v-for="monster in monsterGroup">
                    <li>
                      <RouterLink :to="{ name:'monster', params:{ commitId: commitId, monsterId: monster.MonsterID }}">
                        {{ monster.MonsterName.Text }}
                      </RouterLink>
                    </li>
                  </template>
                </ul>

              </li>
            </template>
          </ul>
          <!--
          <ul>
            <template v-for="monsterCamp in allMonsterCamps()" :key="monsterCamp.ID">
              <li>
                
                <div>{{ monsterCamp.Name.Text }}</div>
                <ul>
                  <template v-for="monsterTemplate in allMonsterTemplatesInCamp(monsterCamp.ID)" :key="monsterTemplate.MonsterTemplateID">
                    <li>
                      
                      <div>{{ monsterTemplate.MonsterName.Text }}</div>
                      <ul>
                        <template v-for="monster in allMonstersInTemplate(monsterTemplate.MonsterTemplateID)" :key="monster.MonsterID">
                          <li>
                            <RouterLink :to="{ name:'monster', params:{ commitId: commitId, monsterId: monster.MonsterID }}">
                              {{ monster.MonsterName.Text }}
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
          -->
        </li>
      </ul>
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
  .mainnav > ul
  {
    margin-bottom:0;
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
    margin: 1rem 0;
    border:1px solid #242424;
    flex-grow: 0;
    flex-shrink: 0;
  }
</style>
