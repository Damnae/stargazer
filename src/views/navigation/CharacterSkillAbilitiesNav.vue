<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { Character } from '@/scripts/sources/character';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'

  const props = defineProps<{character:Character, skillTriggerKey:string}>()

  const abilities = ref<string[]>([])
  watchEffect(() =>
  {
    abilities.value = []
    if (props.character)
      for (const sa of props.character.SkillAbilityList)
      {
        if (sa.Skill == props.skillTriggerKey)
          abilities.value = sa.AbilityList
      }
    abilities.value.sort((a, b) => a > b ? 1 : -1)
  })
</script>

<template>
  <NavTree v-if="abilities.length > 0">
    <template #header>
      <slot name="header" />
    </template>
    <template v-for="ability in abilities" :key="ability">
      <NavItem>
        <span :title="ability">
          <slot :ability="ability" />
        </span>
      </NavItem>
    </template>
  </NavTree>
</template>

<style scoped>
</style>