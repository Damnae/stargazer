<script setup lang="ts">
  import { Character } from '@/scripts/sources/character';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'

  defineProps<{character:Character}>()
</script>

<template>
  <NavTree>
    <template #header>
      <slot name="header" />
    </template>
    <template v-for="ability in character.AbilityList" :key="ability">
      <NavItem>
        <span :title="ability">
          <slot :ability="ability" />
        </span>
      </NavItem>
    </template>
  </NavTree>
</template>

<style scoped>
</style>