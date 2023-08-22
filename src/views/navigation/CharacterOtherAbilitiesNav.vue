<script setup lang="ts">
  import { inject, } from 'vue'
  import { Character } from '../../scripts/sources/character';

  defineProps<{character:Character, routeName:string, objectId:number}>()
  const commitId = inject<string>('commitId') as string
</script>

<template>
  <ul>
    <template v-for="ability in character.AbilityList" :key="ability">
      <li>
        <RouterLink :to="{ name:routeName, params:{ commitId: commitId, objectId: objectId, abilityId: ability, }}">
          <span :title="ability">{{ ability }}</span>
        </RouterLink>
      </li>
    </template>
  </ul>
</template>

<style scoped>
</style>