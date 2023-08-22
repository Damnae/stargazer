<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { Character } from '../../scripts/sources/character';

  const props = defineProps<{skillTriggerKey:string, character:Character}>()
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
  })
</script>

<template>
  <ul v-if="abilities.length > 0">
    <template v-for="ability in abilities" :key="ability">
      <li>
        <span :title="ability">{{ ability }}</span>
      </li>
    </template>
  </ul>
</template>

<style scoped>
</style>