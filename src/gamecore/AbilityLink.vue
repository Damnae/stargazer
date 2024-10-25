<script setup lang="ts">
  import { inject } from 'vue';

  defineProps<{abilityName:string|{Value:string}}>()
  
  const createAbilityRoute = inject<(key:string) => object>('createAbilityRoute') as (key:string) => object
</script>

<template>
  <template v-if="typeof(abilityName) == 'string'">
    <RouterLink v-if="abilityName" :to="createAbilityRoute(abilityName)">
      <em>{{ abilityName }}</em>
    </RouterLink>
  </template>
  <template v-else-if="typeof(abilityName) == 'object'">
    <RouterLink v-if="abilityName.Value" :to="createAbilityRoute(abilityName.Value)">
      <em>{{ abilityName.Value }}</em>
    </RouterLink>
  </template>
</template>

<style scoped>
</style>