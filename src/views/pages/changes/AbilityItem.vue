<script setup lang="ts">
  import { inject, } from 'vue';
  import { Ability } from '@/sources/ability';

  defineProps<{ability:Ability}>()
  const createAbilityRoute = inject<(key:string, from:boolean) => object>('createAbilityRoute') as (key:string, from:boolean) => object
  const createModifierRoute = inject<(key:string, from:boolean) => object>('createModifierRoute') as (key:string, from:boolean) => object
</script>

<template>

  <div class="block">
    <RouterLink v-if="ability.Name" :to="createAbilityRoute(ability.Name, false)">
      <em>{{ ability.Name }}</em>
    </RouterLink>
    <div class="block" v-for="modifier in ability.Modifiers">
      <RouterLink v-if="modifier.Name" :to="createModifierRoute(modifier.Name, false)">
        <em>{{ modifier.Name }}</em>
      </RouterLink>
      <template v-if="modifier.BehaviorFlagList">
        &nbsp;<span class="minor">
          {{ modifier.BehaviorFlagList.join(', ') }}
        </span>
      </template>
    </div>
  </div>

</template>

<style scoped>
</style>