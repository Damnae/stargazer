<script setup lang="ts">
  import { ref } from 'vue';
  import { TaskContextType } from '@/sources/ability';
  import NavTabs from '@/components/NavTabs.vue';
  import Abilities from './changes/Abilities.vue';
  import Modifiers from './changes/Modifiers.vue';
  import Statuses from './changes/Statuses.vue';

  defineProps<{fromCommitId:string, commitId:string}>()

  const tabs:string[] = ['Abilities', 'Modifiers', 'Statuses']
  const selectedTab = ref('Abilities')

  const contextTypes:string[] = ['All', 'Avatar', 'Monster', 'Equipment', 'RelicSet', 'BattleEvent', 'Rogue']
  const selectedContextType = ref('Avatar')
</script>

<template>
  <main class="panel">
    <header>
      <h1>Changes</h1>
    </header>
    <div class="filters">
      <NavTabs :tabs="tabs" v-model:selected="selectedTab" />
      <NavTabs :tabs="contextTypes" v-model:selected="selectedContextType" v-if="['Abilities', 'Modifiers'].includes(selectedTab)" />
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