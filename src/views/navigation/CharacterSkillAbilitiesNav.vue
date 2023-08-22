<script setup lang="ts">
  import { ref, inject, watchEffect } from 'vue'
  import { Character } from '../../scripts/sources/character';

  const props = defineProps<{character:Character, skillTriggerKey:string, routeName:string, skillId:number, objectId:number}>()
  const commitId = inject<string>('commitId') as string

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
        <RouterLink :to="{ name:routeName, params:{ commitId: commitId, skillId: skillId, objectId: objectId, abilityId:ability }}">
          <span :title="ability">{{ ability }}</span>
        </RouterLink>
      </li>
    </template>
  </ul>
</template>

<style scoped>
</style>