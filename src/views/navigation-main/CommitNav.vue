<script setup lang="ts">
  import { ref, provide, computed, } from 'vue'
  import { useRoute } from 'vue-router'
  
  import AvatarNav from './AvatarNav.vue'
  import MonsterNav from './MonsterNav.vue'
  import EquipmentNav from './EquipmentNav.vue'
  import RelicSetNav from './RelicSetNav.vue'
  import StatusNav from './StatusNav.vue'
  import AbilityNav from './AbilityNav.vue'
  import ModifierNav from './ModifierNav.vue'

  import NavTabs from '@/components/NavTabs.vue'
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'
import RogueBuffNav from './RogueBuffNav.vue'

  const search = ref<string>('')
  provide('search', search)
  
  const forceNavigationOpen = computed(() => !!search.value)
  const mainNav = useRoute().meta.mainNav

  const tabs:{[key:string]: any} = 
  {
    All: ['Avatar', 'Monster', 'Equipment', 'RelicSet', 'Status', 'Ability', 'Modifier', 'RogueBuff', 'RogueMiracle'],
    Players: ['Avatar', 'Equipment', 'RelicSet'],
    Monsters: ['Monster'],
    Global: ['Status', 'Ability', 'Modifier'],
    'Simulated Universe': ['RogueBuff', 'RogueMiracle'],
  }

  const startTab = useRoute().meta.mainNavTab as string ?? 'Players'
  const selectedTab = ref(startTab)

  function isVisible(name:string)
  {
    return tabs[selectedTab.value].includes(name)
  }
</script>

<template>
  <nav class="panel">

    <section class="mainnav">
      <input v-model.trim="search" placeholder="Search" />
      <NavTabs :tabs="Object.keys(tabs)" v-model:selected="selectedTab" />
      <NavTree :forceOpen="forceNavigationOpen">

          <NavItem v-if="isVisible('Avatar')"> 
            <NavTree :startsOpen="mainNav == 'Avatar'">
              <template #header>Avatars</template>
              <AvatarNav />  
            </NavTree>   
          </NavItem>

          <NavItem v-if="isVisible('Monster')"> 
            <NavTree :startsOpen="mainNav == 'Monster'">
              <template #header>Monsters</template>
              <MonsterNav />
            </NavTree>
          </NavItem>

          <NavItem v-if="isVisible('Equipment')"> 
            <NavTree :startsOpen="mainNav == 'Equipment'">
              <template #header>Light Cones</template>
              <EquipmentNav />
            </NavTree>
          </NavItem>

          <NavItem v-if="isVisible('RelicSet')"> 
            <NavTree :startsOpen="mainNav == 'RelicSet'">
              <template #header>Relic Sets</template>
              <RelicSetNav />  
            </NavTree>
          </NavItem>

          <NavItem v-if="isVisible('Status')"> 
            <NavTree :startsOpen="mainNav == 'Status'">
              <template #header>Status Effects</template>
              <StatusNav />
            </NavTree>
          </NavItem>

          <NavItem v-if="isVisible('Ability')"> 
            <NavTree :startsOpen="mainNav == 'Ability'">
              <template #header>Abilities</template>
              <AbilityNav />
            </NavTree>
          </NavItem>

          <NavItem v-if="isVisible('Modifier')">
            <NavTree :startsOpen="mainNav == 'Modifier'">
              <template #header>Modifiers</template>
              <ModifierNav />
            </NavTree>
          </NavItem>

          <NavItem v-if="isVisible('RogueBuff')">
            <NavTree :startsOpen="mainNav == 'RogueBuff'">
              <template #header>Blessings</template>
              <RogueBuffNav />
            </NavTree>
          </NavItem>

          <NavItem v-if="isVisible('RogueMiracle')">
            <NavTree :startsOpen="mainNav == 'RogueMiracle'">
              <template #header>Curios</template>
              <span class="minor">Soon™</span>
            </NavTree>
          </NavItem>

      </NavTree>
    </section>

    <hr />

    <section class="subnav">
      <slot />
    </section>

  </nav>
</template>

<style scoped>
  nav
  {
    display:flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
  }
  .mainnav
  {
    display:flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
  }
  .subnav
  {
    flex-grow: 1;
    flex-shrink: 1;
    overflow:auto scroll;
    scrollbar-width: thin;
  }
  nav > hr
  {
    width:100%;
    margin: 1rem 0;
    border:1px solid #242424;
    flex-grow: 0;
    flex-shrink: 0;
  }
</style>