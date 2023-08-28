<script setup lang="ts">
  import { ref, provide } from 'vue'
  import AvatarNav from './AvatarNav.vue'
  import MonsterNav from './MonsterNav.vue'
  import EquipmentNav from './EquipmentNav.vue'
  import RelicSetNav from './RelicSetNav.vue'

  const search = ref<string>('')
  provide('search', search)
</script>

<template>
  <nav class="panel">

    <section class="mainnav">
      <input v-model.trim="search" placeholder="Search" />
      <ul class="navtree">
        <li>
          <div>Avatars</div>
          <AvatarNav />
        </li>
        <li>
          <div>Monsters</div>
          <MonsterNav />
        </li>
        <li>
          <div>Light Cones</div>
          <EquipmentNav />
        </li>
        <li>
          <div>Relic Sets</div>
          <RelicSetNav />
        </li>
      </ul>
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
  .mainnav > ul
  {
    margin-bottom:0;
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