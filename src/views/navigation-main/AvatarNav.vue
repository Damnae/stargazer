<script setup lang="ts">
  import { ref, computed, inject, Ref, } from 'vue'
  import { RouterLink, } from 'vue-router';
  import { Grouped, } from '@/common/common';
  import { getAvatars, Avatar, AvatarConfig, } from '@/sources/avatar';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'

  const commitId = inject<string>('commitId') as string
  const search = inject<Ref<string>>('search') as Ref<string>

  const avatars = ref<AvatarConfig>(await getAvatars(commitId))
  const avatarsSearchResults = computed(() => allAvatarsByDamageType())

  function allAvatars() : Avatar[]
  {
    return Object.values(avatars.value)
      .filter(v => v.SearchKeywords.some(k => k.includes(search.value.toLowerCase())))
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
  <NavItem v-for="(avatars, damageType) in avatarsSearchResults" :key="damageType">
    <NavTree>
      <template #header>{{ damageType }}</template>
      <NavItem v-for="avatar in avatars" :key="avatar.AvatarID">
        <RouterLink :to="{ name:'avatar', params:{ commitId: commitId, objectId: avatar.AvatarID }}">
          <span :title="avatar.AvatarName.Text">{{ avatar.AvatarName.Text }}</span>
        </RouterLink>
      </NavItem>
    </NavTree>
  </NavItem>
</template>

<style scoped>
</style>