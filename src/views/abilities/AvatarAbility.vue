<script setup lang="ts">
  import { ref, watch, } from 'vue'
  import { getAvatar, } from '../../scripts/sources/avatar';
  import { getAvatarSkillsByIds, } from '../../scripts/sources/avatarskill';
  import { getCharacterByAvatar, } from '../../scripts/sources/character';
  import { buildAbilityContext, AbilityContext, } from '../../scripts/sources/ability';
  import Ability from './Ability.vue';

  const props = defineProps<{commitId:string, objectId:number, abilityId:string}>()
  
  const abilityContext = ref<AbilityContext>(await getAbilityContext())
  watch(props, async () => abilityContext.value = await getAbilityContext())

  async function getAbilityContext()
  {
    const avatar = await getAvatar(props.commitId, props.objectId)
    const avatarSkills = await getAvatarSkillsByIds(props.commitId, avatar.SkillList)
    const character = await getCharacterByAvatar(props.commitId, avatar)
    return buildAbilityContext(avatar, avatarSkills, character)
  }
</script>

<template> 
  <main class="panel">
    <Ability :abilityId="abilityId" :context="abilityContext" />
  </main>
</template>

<style scoped>
</style>