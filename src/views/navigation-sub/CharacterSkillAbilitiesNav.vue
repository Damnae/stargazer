<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { Character } from '@/sources/character';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'

  const props = defineProps<{character?:Character, skillTriggerKey:string}>()

  const abilities = ref<string[]>([])
  watchEffect(() =>
  {
    abilities.value = []
    if (props.character?.SkillAbilityList)
      for (const sa of props.character.SkillAbilityList)
        if (sa.Skill == props.skillTriggerKey)
        {
          abilities.value = sa.AbilityList
          break
        }
    abilities.value.sort((a, b) => a > b ? 1 : -1)
  })
</script>

<template>
  <NavTree :startsOpen="true">
    <template #header>
      <slot name="header" />
    </template>
    <NavItem v-for="ability in abilities">
      <span :title="ability">
        <slot :ability="ability" />
      </span>
    </NavItem>
    <template #footer>
      <slot name="footer" />
    </template>
  </NavTree>
</template>

<style scoped>
</style>