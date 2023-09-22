<script setup lang="ts">
  import { ref, computed, inject, Ref, } from 'vue'
  import { RouterLink } from 'vue-router';
  import { Grouped, } from '@/common/common';
  import { getBattleEvents, BattleEvent, BattleEventConfig, } from '@/sources/battleevent';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'

  const commitId = inject<string>('commitId') as string
  const search = inject<Ref<string>>('search') as Ref<string>

  const battleEvents = ref<BattleEventConfig>(await getBattleEvents(commitId))
  const battleEventsSearchResults = computed(() => allBattleEventsByTemplateByCamp())

  function allBattleEvents() : BattleEvent[]
  {
    return Object.values(battleEvents.value)
      .filter(v => v.SearchKeywords.some(k => k.includes(search.value.toLowerCase())))
      .sort((a, b) => a.BattleEventName > b.BattleEventName ? 1 : -1)
  }

  function allBattleEventsByTemplateByCamp() : Grouped<BattleEvent>
  {
    return allBattleEvents()
      .reduce((eventSubTypes:Grouped<BattleEvent>, battleEvent:BattleEvent) => 
      {
        const key = battleEvent.EventSubType;
        const battleEvents = (eventSubTypes[key] || []);
        battleEvents.push(battleEvent);
        eventSubTypes[key] = battleEvents;
        return eventSubTypes;
      }, {})
  }
</script>

<template>
  <NavItem v-for="(battleEvents, eventSubType) in battleEventsSearchResults" :key="eventSubType">
    <NavTree>
      <template #header>{{ eventSubType }}</template>
      <NavItem v-for="battleEvent in battleEvents" :key="battleEvent.BattleEventID">
        <RouterLink :to="{ name:'battleEvent', params:{ commitId: commitId, objectId: battleEvent.BattleEventID }}">
          <span :title="battleEvent.BattleEventName">{{ battleEvent.BattleEventName }}</span>
        </RouterLink>
      </NavItem>
    </NavTree>
  </NavItem>
</template>

<style scoped>
</style>