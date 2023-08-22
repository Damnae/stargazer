<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getAvatar, Avatar, } from '../../scripts/sources/avatar';
  import { getCharacterByAvatar, Character } from '../../scripts/sources/character';
  import { getAvatarSkill, AvatarSkill, } from '../../scripts/sources/avatarskill';
  import Ability from './Ability.vue';

  const props = defineProps<{commitId:string, objectId:number, skillId?:number, abilityId:string}>()
  
  const avatar = ref<Avatar>(await getAvatar(props.commitId, props.objectId))
  const avatarSkill = ref<AvatarSkill>()
  const character = ref<Character>()

  watchEffect(async () => 
  {
    avatar.value = await getAvatar(props.commitId, props.objectId)
    if (props.skillId)
      avatarSkill.value = await getAvatarSkill(props.commitId, props.skillId)
    character.value = await getCharacterByAvatar(props.commitId, avatar.value)
  })
</script>

<template>
  <main class="panel">
    <Ability :abilityId="abilityId" />
  </main>
</template>

<style scoped>
</style>