<script setup lang="ts">
  import { inject, } from 'vue';
  import { BattleEvent } from '@/sources/battleevent';

  defineProps<{battleEvent:BattleEvent, isPrevious:boolean}>()
  const createBattleEventAbilityRoute = inject<(key:number, abilityId:string, from:boolean) => object>('createBattleEventAbilityRoute') as (key:number, abilityId:string, from:boolean) => object
  const createBattleEventRoute = inject<(key:number, from:boolean) => object>('createBattleEventRoute') as (key:number, from:boolean) => object
</script>

<template>

  <div class="block">
    <RouterLink :to="createBattleEventRoute(battleEvent.BattleEventID, isPrevious)">
      <em>{{ battleEvent.BattleEventName }}</em>
    </RouterLink>
    &nbsp;<span class="minor">{{ battleEvent.EventSubType }}</span>
    <div class="block" v-for="abilityName in battleEvent.AbilityList">
      <RouterLink :to="createBattleEventAbilityRoute(battleEvent.BattleEventID, abilityName, isPrevious)">
        <em>{{ abilityName }}</em>
      </RouterLink>
    </div>
  </div>

</template>

<style scoped>
</style>