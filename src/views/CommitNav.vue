<script setup lang="ts">
  import { ref, inject } from 'vue'
  import { 
    getAvatars, AvatarConfig,
    getMonsters, MonsterConfig,
  } from '../scripts/configsource.ts';
import { RouterLink } from 'vue-router';

  const commitId = inject<string>('commitId', '')

  const avatars = ref<AvatarConfig>(await getAvatars(commitId))
  const monsters = ref<MonsterConfig>(await getMonsters(commitId))

  const search = ref<string>('')
</script>

<template>
  <nav class="panel">

    <input v-model.trim="search" placeholder="Search" />

    <h2>{{ Object.keys(avatars).length }} Avatars</h2>
    <ul>
      <li v-for="avatar in Object.values(avatars)" :key="avatar.AvatarID">
        <RouterLink :to="{ name:'avatar', params:{ commitId: commitId, avatarId: avatar.AvatarID }}">
          {{ avatar.AvatarName.Text ?? avatar.AvatarID }}
        </RouterLink>
      </li>
    </ul>

    <h2>{{ Object.keys(monsters).length }} Monsters</h2>
    <ul>
      <li v-for="monster in Object.values(monsters)" :key="monster.MonsterID">
        {{ monster.MonsterName.Text ?? monster.MonsterID }}
      </li>
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
