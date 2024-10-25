<script setup lang="ts">
  import { inject } from 'vue';

  defineProps<{modifierName:string|{Value:string}}>()
  
  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
</script>

<template>
  <template v-if="typeof(modifierName) == 'string'">
    <RouterLink v-if="modifierName" :to="createModifierRoute(modifierName)">
      <em>{{ modifierName }}</em>
    </RouterLink>
  </template>
  <template v-else-if="typeof(modifierName) == 'object'">
    <RouterLink v-if="modifierName.Value" :to="createModifierRoute(modifierName.Value)">
      <em>{{ modifierName.Value }}</em>
    </RouterLink>
  </template>
</template>

<style scoped>
</style>