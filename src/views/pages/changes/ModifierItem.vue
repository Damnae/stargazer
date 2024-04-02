<script setup lang="ts">
  import { inject, } from 'vue';
  import { Modifier } from '@/sources/ability';

  defineProps<{modifier:Modifier, isPrevious:boolean}>()
  //const createAbilityRoute = inject<(key:string, from:boolean) => object>('createAbilityRoute') as (key:string, from:boolean) => object
  const createModifierRoute = inject<(key:string, from:boolean) => object>('createModifierRoute') as (key:string, from:boolean) => object
</script>

<template>

  <div class="block">
    <RouterLink v-if="modifier.Name" :to="createModifierRoute(modifier.Name, isPrevious)">
      <em>{{ modifier.Name }}</em>
    </RouterLink>
    <template v-if="modifier.BehaviorFlagList">
      &nbsp;<span class="minor">
        {{ modifier.BehaviorFlagList.join(', ') }}
      </span>
    </template>
  </div>

</template>

<style scoped>
</style>