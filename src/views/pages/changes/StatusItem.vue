<script setup lang="ts">
  import { inject, } from 'vue';
  import { Status } from '@/sources/status';

  defineProps<{status:Status, isPrevious:boolean}>()
  //const createAbilityRoute = inject<(key:string, from:boolean) => object>('createAbilityRoute') as (key:string, from:boolean) => object
  const createModifierRoute = inject<(key:string, from:boolean) => object>('createModifierRoute') as (key:string, from:boolean) => object
</script>

<template>

  <div class="block">
    <template v-if="status.ModifierName">
      <RouterLink :to="createModifierRoute(status.ModifierName, isPrevious)">
        <em>{{ status.StatusName.Text }}</em>
      </RouterLink>
      &nbsp;<span class="minor">
        {{ status.ModifierName }}
      </span>
    </template>
    <template v-else>
      <em>{{ status.StatusName.Text }}</em>
    </template>
  </div>

</template>

<style scoped>
</style>