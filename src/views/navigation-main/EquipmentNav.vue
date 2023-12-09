<script setup lang="ts">
  import { ref, computed, inject, Ref, } from 'vue'
  import { RouterLink } from 'vue-router';
  import { Grouped, } from '@/common/common.ts';
  import { getEquipments, Equipment, EquipmentConfig, } from '@/sources/equipment';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'

  const commitId = inject<string>('commitId') as string
  const search = inject<Ref<string>>('search') as Ref<string>

  const equipments = ref<EquipmentConfig>(await getEquipments(commitId))
  const equipmentsSearchResults = computed(() => allEquipmentsByPath())

  function allEquipments() : Equipment[]
  {
    return Object.values(equipments.value)
      .filter(v => v.SearchKeywords.some(k => k.includes(search.value.toLowerCase())))
      .sort((a, b) => a.EquipmentID > b.EquipmentID ? 1 : -1)
  }

  function allEquipmentsByPath() : Grouped<Equipment>
  {
    return allEquipments()
      .reduce((paths:Grouped<Equipment>, equipment:Equipment) => 
      {
        const key = equipment.AvatarBaseType;
        const equipments = (paths[key] || []);
        equipments.push(equipment);
        paths[key] = equipments;
        return paths;
      }, {})
  }
</script>

<template>
  <NavItem v-for="(equipments, path) in equipmentsSearchResults" :key="path">
    <NavTree>
      <template #header>{{ path }}</template>
      <NavItem v-for="equipment in equipments" :key="equipment.EquipmentID">
        <RouterLink :to="{ name:'equipment', params:{ commitId: commitId, objectId: equipment.EquipmentID }}">
          <span :title="equipment.EquipmentName.Text">{{ equipment.EquipmentName.Text }}</span>
        </RouterLink>
      </NavItem>
    </NavTree>
  </NavItem>
</template>

<style scoped>
</style>