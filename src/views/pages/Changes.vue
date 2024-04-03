<script setup lang="ts">
  import { ref, provide, } from 'vue';
  import { TaskContextType } from '@/sources/ability';
  import NavTabs from '@/components/NavTabs.vue';
  import Abilities from './changes/Abilities.vue';
  import Modifiers from './changes/Modifiers.vue';
  import Statuses from './changes/Statuses.vue';
  import BattleEvents from './changes/BattleEvents.vue';

  const props = defineProps<{fromCommitId:string, commitId:string}>()

  const tabs:string[] = ['Abilities', 'Modifiers', 'Statuses', 'Battle Events']
  const tabsWithContext = ['Abilities', 'Modifiers']
  const selectedTab = ref('Abilities')

  const contextTypes:{[key:string]: TaskContextType} = 
  {
    'All': TaskContextType.All, 
    'Common': TaskContextType.DiffCommon, 
    'Avatars': TaskContextType.DiffAvatar, 
    'Monsters': TaskContextType.DiffMonster, 
    'Light Cones': TaskContextType.DiffEquipment, 
    'Relic Sets': TaskContextType.DiffRelicSet, 
    'Battle Events': TaskContextType.DiffBattleEvent, 
    'Level': TaskContextType.DiffLevel,
  }
  const selectedContextType = ref('Avatars')

  provide('createAbilityRoute', (abilityId:string, isPrevious:boolean) : object => { return { name: 'ability', params:{ commitId: isPrevious ? props.fromCommitId : props.commitId, abilityId: abilityId, } }})
  provide('createModifierRoute', (modifierId:string, isPrevious:boolean) : object => { return { name: 'modifier', params:{ commitId: isPrevious ? props.fromCommitId : props.commitId, modifierId: modifierId, } }})
  provide('createBattleEventRoute', (battleEventId:number, isPrevious:boolean) : object => { return { name: 'battleEvent', params:{ commitId: isPrevious ? props.fromCommitId : props.commitId, objectId: battleEventId, } }})
  provide('createBattleEventAbilityRoute', (battleEventId:number, abilityId:string, isPrevious:boolean) : object => { return { name: 'battleEventAbility', params:{ commitId: isPrevious ? props.fromCommitId : props.commitId, abilityId: abilityId, objectId: battleEventId, } }})
</script>

<template>
  <main class="panel">
    <header>
      <h1>Changes</h1>
    </header>
    <div class="filters">
      <NavTabs :tabs="tabs" v-model:selected="selectedTab" />
      <NavTabs :tabs="Object.keys(contextTypes)" v-model:selected="selectedContextType" v-if="tabsWithContext.includes(selectedTab)" />
    </div>
    <section>
      <Abilities v-if="selectedTab == 'Abilities'" 
        :fromCommitId="fromCommitId" :commitId="commitId"
        :contextType="contextTypes[selectedContextType]" />
      <Modifiers v-if="selectedTab == 'Modifiers'" 
        :fromCommitId="fromCommitId" :commitId="commitId"
        :contextType="contextTypes[selectedContextType]"  />
      <Statuses v-if="selectedTab == 'Statuses'" 
        :fromCommitId="fromCommitId" :commitId="commitId" />
      <BattleEvents v-if="selectedTab == 'Battle Events'" 
        :fromCommitId="fromCommitId" :commitId="commitId" />
    </section>
  </main>
</template>

<style scoped>
</style>