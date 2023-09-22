<script setup lang="ts">
  import { ref, watch, inject, } from 'vue'
  import { Character } from '@/sources/character'
  import { Ability, TaskContextType, getTaskContext, } from '@/sources/ability';
  import NavItem from '@/components/NavItem.vue'

  const props = defineProps<{character:Character, taskContextType:TaskContextType}>()

  const commitId = inject<string>('commitId') as string
  const modifiers = ref<string[]>([])

  watch(props, async () => 
  {
    const taskContext = await getTaskContext(commitId, props.taskContextType)

    const mods:string[] = []
    if (props.character)
    {
      if (props.character.SkillAbilityList)
        for (const skillEntry of props.character.SkillAbilityList)
          for (const abilityName of skillEntry.AbilityList)
            addModifierNamesFromAbility(mods, taskContext.Abilities[abilityName])

      if (props.character.AbilityList)
        for (const abilityName of props.character.AbilityList)
            addModifierNamesFromAbility(mods, taskContext.Abilities[abilityName])
    }
    mods.sort((a, b) => a > b ? 1 : -1)
    modifiers.value = mods
  }, 
  { immediate:true })

  function addModifierNamesFromAbility(modifiers:string[], ability?:Ability)
  {
    if (ability?.Modifiers)
      for (const modifierName of Object.keys(ability.Modifiers))
        modifiers.push(modifierName)
  }
</script>

<template>
  <NavItem v-for="modifier in modifiers">
    <span :title="modifier">
      <slot :modifier="modifier" />
    </span>
  </NavItem>
</template>

<style scoped>
</style>