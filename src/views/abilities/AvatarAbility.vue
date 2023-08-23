<script setup lang="ts">
  import { ref, watch, } from 'vue'
  import { getAvatar, Avatar, } from '../../scripts/sources/avatar';
  import { getAvatarSkill, AvatarSkill, } from '../../scripts/sources/avatarskill';
  import { getCharacterByAvatar, Character, CharacterDynamicValue, } from '../../scripts/sources/character';
  import { AbilityContext, AbilityContextDynamicValues, AbilityParam } from '../../scripts/sources/ability';
  import Ability from './Ability.vue';

  const props = defineProps<{commitId:string, objectId:number, skillId?:number, abilityId:string}>()
  
  const avatar = ref<Avatar>(await getAvatar(props.commitId, props.objectId))
  const avatarSkill = ref<AvatarSkill>()
  const character = ref<Character>()

  const abilityContext = ref<AbilityContext>()

  watch([props], async () => 
  {
    avatar.value = await getAvatar(props.commitId, props.objectId)
    if (props.skillId)
      avatarSkill.value = await getAvatarSkill(props.commitId, props.skillId)
    else avatarSkill.value = undefined
    character.value = await getCharacterByAvatar(props.commitId, avatar.value)
    abilityContext.value = buildAbilityContext(avatar.value, character.value, avatarSkill.value)
  }, {immediate:true})

  function buildAbilityContext(_avatar:Avatar, character:Character, skill?:AvatarSkill) : AbilityContext
  {
    const params:AbilityParam[] = skill?.ParamList ?? []
    const characterValues:AbilityContextDynamicValues = Object.fromEntries(
        Object.entries(character.DynamicValues?.Values ?? {})
          .map(([key, value], _index) => [key, { Name:getDynamicValueName(key), Value:resolveDynamicValue(value, params), From:`character/${explainDynamicValue(value)}` }])
    )

    return {
      DynamicValues: 
      [
        // Avatar / Monster could have them?
        {
          Source: 'character',
          Values: characterValues,
        },
        // Can also be on modifiers
      ],
    }
  }

  function getDynamicValueName(key:string) : string
  {
      // TODO
    return key
  }
  function resolveDynamicValue(value:CharacterDynamicValue, params:AbilityParam[]) : number
  {
    if (!value.ReadInfo)
      return 0

      // TODO
    return params[0].Value ?? 0
  }
  function explainDynamicValue(value:CharacterDynamicValue) : string
  {
    if (!value.ReadInfo)
      return 'undefined'

    // TODO
    return `${value.ReadInfo?.Str}/${value.ReadInfo?.Type}`
  }
</script>

<template> 
  <main class="panel">
    <Ability :abilityId="abilityId" :key="abilityId"/>
    
    <span>{{ objectId }} {{ skillId }} {{ abilityId }}</span>
    <pre>{{ avatarSkill?.ParamList }}</pre>
    <pre>{{ abilityContext }}</pre>
  </main>
</template>

<style scoped>
</style>