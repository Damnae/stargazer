<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getAvatar, Avatar, } from '../scripts/sources/avatar.ts';
  import { AvatarSkill, getAvatarSkillsByIds, } from '../scripts/sources/avatarskill.ts';

  const props = defineProps<{commitId:string, avatarId: number}>()

  const avatar = ref<Avatar>(await getAvatar(props.commitId, props.avatarId))
  const avatarSkills = ref<AvatarSkill[]>([])
  watchEffect(async () => 
  {
    avatar.value = await getAvatar(props.commitId, props.avatarId)
    avatarSkills.value = await getAvatarSkillsByIds(props.commitId, avatar.value.SkillList)
  })
</script>

<template>
  <h1>{{ avatar.AvatarName.Text }}</h1>
  <ul class="navtree">
    <li>
      <div>Skills</div>
      <ul>
        <template v-for="avatarSkill in avatarSkills">
          <li>
            {{ avatarSkill.SkillTag.Text }} {{ avatarSkill.SkillTypeDesc.Text }} <span class="minor" :title="avatarSkill.SkillName.Text">{{ avatarSkill.SkillName.Text }}</span>
          </li>
        </template>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>