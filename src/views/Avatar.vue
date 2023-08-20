<script setup lang="ts">
  import { ref, watchEffect, inject, provide } from 'vue'
  import { getAvatar, Avatar, } from '../scripts/configsource.ts';
  
  const props = defineProps<{avatarId: number}>()
  provide<number>('avatarId', props.avatarId)

  const commitId = inject<string>('commitId', '')

  const avatar = ref<Avatar>(await getAvatar(commitId, props.avatarId))
  watchEffect(async () => avatar.value = await getAvatar(commitId, props.avatarId))
</script>

<template>
  <section class="panel">
    <h1>{{ avatar.AvatarName.Text }}</h1>
  </section>
</template>

<style scoped>
  section
  {
    flex-grow:1;
  }
</style>
