<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getAvatar, Avatar, } from '../scripts/sources/avatar.ts';

  const props = defineProps<{commitId:string, avatarId: number}>()

  const avatar = ref<Avatar>(await getAvatar(props.commitId, props.avatarId))
  watchEffect(async () => 
  {
    avatar.value = await getAvatar(props.commitId, props.avatarId)
  })
</script>

<template>
  <h1>{{ avatar.AvatarName.Text }}</h1>
  <ul class="navtree">
    <li>
      <div>Skills</div>
      <ul>
        <template v-for="skillId in avatar.SkillList">
          <li>{{ skillId }}</li>
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
../scripts/avatarsource.ts