<script setup lang="ts">
  import { ref, provide, } from 'vue';
  import { getCommitVersion, getUpCommitId, getDownCommitId } from '@/common/datasource';
  import useNavigationState from '@/common/navstate';
  import { TaskContextType } from '@/sources/ability';
  import NavTabs from '@/components/NavTabs.vue';
  import Files from './changes/Files.vue';
  import Abilities from './changes/Abilities.vue';
  import Modifiers from './changes/Modifiers.vue';
  import Statuses from './changes/Statuses.vue';
  import BattleEvents from './changes/BattleEvents.vue';

  const props = defineProps<{fromCommitId:string, commitId:string}>()
  const fromName = ref(await getCommitVersion(props.fromCommitId))
  const toName = ref(await getCommitVersion(props.commitId))
  const upCommitId = ref(await getUpCommitId(props.commitId))
  const downCommitId = ref(await getDownCommitId(props.fromCommitId))

  const navState = useNavigationState()

  const tabs:string[] = ['Files', 'Abilities', 'Modifiers', 'Statuses', 'Battle Events']
  const tabsWithContext = ['Abilities', 'Modifiers']
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
    'Adventure': TaskContextType.DiffAdventure,
  }

  provide('createAbilityRoute', (abilityId:string, isPrevious:boolean) : object => { return { name: 'ability', params:{ commitId: isPrevious ? props.fromCommitId : props.commitId, abilityId: abilityId, } }})
  provide('createModifierRoute', (modifierId:string, isPrevious:boolean) : object => { return { name: 'modifier', params:{ commitId: isPrevious ? props.fromCommitId : props.commitId, modifierId: modifierId, } }})
  provide('createBattleEventRoute', (battleEventId:number, isPrevious:boolean) : object => { return { name: 'battleEvent', params:{ commitId: isPrevious ? props.fromCommitId : props.commitId, objectId: battleEventId, } }})
  provide('createBattleEventAbilityRoute', (battleEventId:number, abilityId:string, isPrevious:boolean) : object => { return { name: 'battleEventAbility', params:{ commitId: isPrevious ? props.fromCommitId : props.commitId, abilityId: abilityId, objectId: battleEventId, } }})
</script>

<template>
  <main class="panel">
    <header>
      <h1>Changes</h1>
      <div class="header-info">
        <div>
          Comparing 
          <RouterLink v-if="upCommitId" :to="{ name:'changes', params:{ fromCommitId: commitId, commitId: upCommitId }}">
            <em>{{ toName }}</em>
          </RouterLink>
          <em v-else>{{ toName }}</em>&nbsp;<span class="code" :title="commitId">{{ commitId.slice(0, 6) }}</span>
        </div>
        <div>
          since 
          <RouterLink v-if="downCommitId" :to="{ name:'changes', params:{ fromCommitId: downCommitId, commitId: fromCommitId }}">
            <em>{{ fromName }}</em>
          </RouterLink>
          <em v-else>{{ fromName }}</em>&nbsp;<span class="code" :title="fromCommitId">{{ fromCommitId.slice(0, 6) }}</span>
        </div>
      </div>
    </header>
    <div class="filters">
      <NavTabs :tabs="tabs" v-model:selected="navState.changeTab" />
      <NavTabs :tabs="Object.keys(contextTypes)" v-model:selected="navState.changeContext" v-if="tabsWithContext.includes(navState.changeTab)" />
    </div>
    <section>
      <Files v-if="navState.changeTab == 'Files'" 
        :fromCommitId="fromCommitId" :commitId="commitId" />
        
      <Abilities v-if="navState.changeTab == 'Abilities'" 
        :fromCommitId="fromCommitId" :commitId="commitId"
        :contextType="contextTypes[navState.changeContext]" />
      <Modifiers v-if="navState.changeTab == 'Modifiers'" 
        :fromCommitId="fromCommitId" :commitId="commitId"
        :contextType="contextTypes[navState.changeContext]"  />

      <Statuses v-if="navState.changeTab == 'Statuses'" 
        :fromCommitId="fromCommitId" :commitId="commitId" />
      <BattleEvents v-if="navState.changeTab == 'Battle Events'" 
        :fromCommitId="fromCommitId" :commitId="commitId" />
    </section>
  </main>
</template>

<style scoped>
  .code 
  {
    font-family: monospace;
    font-size: 1rem;
  }
</style>