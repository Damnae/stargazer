<script setup lang="ts">
  import { ref, computed, inject, Ref, } from 'vue'
  import { RouterLink } from 'vue-router';
  import { Grouped, } from '../../scripts/common';
  import { getAvatars, Avatar, AvatarConfig, } from '../../scripts/sources/avatar';

  const commitId = inject<string>('commitId') as string
  const search = inject<Ref<string>>('search') as Ref<string>

  const avatars = ref<AvatarConfig>(await getAvatars(commitId))
  const avatarsSearchResults = computed(() => allAvatarsByDamageType())

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
</script>

<template>
  <ul>
    <template v-for="(avatars, damageType) in avatarsSearchResults" :key="damageType">
      <li>
        
        <div>{{ damageType }}</div>
        <ul>
          <template v-for="avatar in avatars" :key="avatar.AvatarID">
            <li>
              <RouterLink :to="{ name:'avatar', params:{ commitId: commitId, objectId: avatar.AvatarID }}">
                <span :title="avatar.AvatarName.Text">{{ avatar.AvatarName.Text }}</span>
              </RouterLink>
            </li>
          </template>
        </ul>

      </li>
    </template>
  </ul>
</template>

<style scoped>
</style>