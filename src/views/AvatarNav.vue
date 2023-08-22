<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getAvatar, Avatar, } from '../scripts/sources/avatar';
  import { getCharacterByAvatar, Character } from '../scripts/sources/character';
  import { getAvatarSkillsByIds, AvatarSkill, } from '../scripts/sources/avatarskill';
  import CharacterSkillNav from './CharacterSkillNav.vue';
  import CharacterNav from './CharacterNav.vue';

  const props = defineProps<{commitId:string, avatarId:number}>()

  const avatar = ref<Avatar>(await getAvatar(props.commitId, props.avatarId))
  const avatarSkills = ref<AvatarSkill[]>([])
  const character = ref<Character>(await getCharacterByAvatar(props.commitId, avatar.value))

  watchEffect(async () => 
  {
    avatar.value = await getAvatar(props.commitId, props.avatarId)
    avatarSkills.value = await getAvatarSkillsByIds(props.commitId, avatar.value.SkillList)
    character.value = await getCharacterByAvatar(props.commitId, avatar.value)
  })
</script>

<template>
  <h1>{{ avatar.AvatarName.Text }}</h1>
  <ul class="navtree">
    <li>
      <div>Skills</div>
      <ul>
        <template v-for="skill in avatarSkills">
          <li>
            <div :title="skill.SkillTriggerKey">{{ skill.SkillTag.Text }} {{ skill.SkillTypeDesc.Text }} <span class="minor" :title="skill.SkillName.Text">{{ skill.SkillName.Text }}</span></div>
            <CharacterSkillNav :skillTriggerKey="skill.SkillTriggerKey" :character="character" />
          </li>
        </template>
      </ul>
    </li>
    <li>
      <CharacterNav :character="character" />
    </li>
  </ul>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>