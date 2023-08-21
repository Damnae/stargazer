<script setup lang="ts">
  import { ref, computed, inject } from 'vue'
  import { RouterLink } from 'vue-router';
  import { 
    getAvatars, Avatar, AvatarConfig, 
    getMonsters, Monster, MonsterConfig, 
    Grouped, Grouped2,
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
      .reduce((damageTypes:Grouped<Avatar>, avatar:Avatar) => 
      {
        const key = avatar.DamageType;
        const avatars = (damageTypes[key] || []);
        avatars.push(avatar);
        damageTypes[key] = avatars;
        return damageTypes;
      }, {})
  }

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
  <nav class="panel">

    <section class="mainnav">
      <input v-model.trim="search" placeholder="Search" />

      <ul class="navtree">
        <li>
          <div>Avatars</div>
          <ul>
            <template v-for="(avatars, damageType) in avatarsSearchResults">
              <li>
                
                <div>{{ damageType }}</div>
                <ul>
                  <template v-for="avatar in avatars" :key="avatar.AvatarID">
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
            <template v-for="(monsterTemplate, monsterCampName) in monstersSearchResults">
              <li>

                <div>{{ monsterCampName }}</div>
                <ul>
                  <template v-for="(monsters, monsterTemplateName) in monsterTemplate">
                    <li>

                      <div>{{ monsterTemplateName }}</div>
                      <ul>
                        <template v-for="monster in monsters">
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
