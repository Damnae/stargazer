<script setup lang="ts">
  import { Character } from '@/sources/character';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'

  defineProps<{character:Character}>()
</script>

<template>
  <NavTree :startsOpen="true">
    <template #header>
      <slot name="header" />
    </template>
    <NavItem v-for="ability in character.AbilityList">
      <span :title="ability">
        <slot :ability="ability" />
      </span>
    </NavItem>
  </NavTree>
</template>

<style scoped>
</style>