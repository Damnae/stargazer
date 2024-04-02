<script setup lang="ts">
  import { ref, provide, } from 'vue';
  import { TaskContextType } from '@/sources/ability';
  import NavTabs from '@/components/NavTabs.vue';
  import Abilities from './changes/Abilities.vue';
  import Modifiers from './changes/Modifiers.vue';
  import Statuses from './changes/Statuses.vue';

  const props = defineProps<{fromCommitId:string, commitId:string}>()

  const tabs:string[] = ['Abilities', 'Modifiers', 'Statuses']
  const tabsWithContext = ['Abilities', 'Modifiers']
  const selectedTab = ref('Abilities')

  const contextTypes:string[] = ['All', 'Avatar', 'Monster', 'Equipment', 'RelicSet', 'BattleEvent', 'Rogue']
  const selectedContextType = ref('Avatar')

  provide('createAbilityRoute', (abilityId:string, from:boolean) : object => { return { name: 'ability', params:{ commitId: from ? props.fromCommitId : props.commitId, abilityId: abilityId, } }})
  provide('createModifierRoute', (modifierId:string, from:boolean) : object => { return { name: 'modifier', params:{ commitId: from ? props.fromCommitId : props.commitId, modifierId: modifierId, } }})
</script>

<template>
  <main class="panel">
    <header>
      <h1>Changes</h1>
    </header>
    <div class="filters">
      <NavTabs :tabs="tabs" v-model:selected="selectedTab" />
      <NavTabs :tabs="contextTypes" v-model:selected="selectedContextType" v-if="tabsWithContext.includes(selectedTab)" />
    </div>
    <section>
      <Abilities v-if="selectedTab == 'Abilities'" 
        :fromCommitId="fromCommitId" :commitId="commitId"
        :contextType="selectedContextType as TaskContextType" />
      <Modifiers v-if="selectedTab == 'Modifiers'" 
        :fromCommitId="fromCommitId" :commitId="commitId"
        :contextType="selectedContextType as TaskContextType"  />
      <Statuses v-if="selectedTab == 'Statuses'" 
        :fromCommitId="fromCommitId" :commitId="commitId" />
    </section>
  </main>
</template>

<style scoped>
</style>