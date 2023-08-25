<script setup lang="ts">
  import { ref, watch, } from 'vue'
  import { getAvatar, } from '../../scripts/sources/avatar';
  import { getAvatarSkillsByIds, } from '../../scripts/sources/avatarskill';
  import { getCharacterByAvatar, } from '../../scripts/sources/character';
  import { getAbilityContext, AbilityContext, AbilityContextType, } from '../../scripts/sources/ability';
  import { buildAbilityContext, GamecoreContext, } from '../../scripts/sources/gamecore';
  import Ability from './Ability.vue';

  const props = defineProps<{commitId:string, objectId:number, abilityId:string}>()
  
  const gamecoreContext = ref<GamecoreContext>(await getGamecoreContext())
  watch(props, async () => gamecoreContext.value = await getGamecoreContext())

  async function getGamecoreContext()
  {
    const avatar = await getAvatar(props.commitId, props.objectId)
    const avatarSkills = await getAvatarSkillsByIds(props.commitId, avatar.SkillList)
    const character = await getCharacterByAvatar(props.commitId, avatar)
    return buildAbilityContext(avatar, avatarSkills, character)
  }

  const abilityContext = ref<AbilityContext>(await getAbilityContext(props.commitId, AbilityContextType.Avatar))
  watch(props, async () => abilityContext.value = await getAbilityContext(props.commitId, AbilityContextType.Avatar))
</script>

<template> 
  <main class="panel">
    <Ability :abilityId="abilityId" :abilityContext="abilityContext" />
  </main>
  <aside class="panel">
    <h1>Context</h1>
  </aside>
</template>

<style scoped>
</style>