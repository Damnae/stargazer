<script setup lang="ts">
  import { ref, provide, computed, } from 'vue'
  import AvatarNav from './AvatarNav.vue'
  import MonsterNav from './MonsterNav.vue'
  import EquipmentNav from './EquipmentNav.vue'
  import RelicSetNav from './RelicSetNav.vue'
  import StatusNav from './StatusNav.vue'
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'

  const search = ref<string>('')
  provide('search', search)
  
  const forceNavigationOpen = computed(() => !!search.value)
</script>

<template>
  <nav class="panel">

    <section class="mainnav">
      <input v-model.trim="search" placeholder="Search" />
      <NavTree :forceOpen="forceNavigationOpen">
        <NavItem> 
          <NavTree>
            <template #header>Avatars</template>
            <AvatarNav />  
          </NavTree>   
        </NavItem>
        <NavItem> 
          <NavTree>
            <template #header>Monsters</template>
            <MonsterNav />
          </NavTree>
        </NavItem>
        <NavItem> 
          <NavTree>
            <template #header>Light Cones</template>
            <EquipmentNav />
          </NavTree>
        </NavItem>
        <NavItem> 
          <NavTree>
            <template #header>Relic Sets</template>
            <RelicSetNav />  
          </NavTree>
        </NavItem>
        <NavItem> 
          <NavTree>
            <template #header>Status Effects</template>
            <StatusNav />
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
  }
  .mainnav
  {
    height:20rem;
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