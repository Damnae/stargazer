<script setup lang="ts">
  import { ref, computed, inject, Ref, } from 'vue'
  import { RouterLink } from 'vue-router';
  import { Grouped, } from '../../scripts/common.ts';
  import { getEquipments, Equipment, EquipmentConfig, } from '../../scripts/sources/equipment';

  const commitId = inject<string>('commitId') as string
  const search = inject<Ref<string>>('search') as Ref<string>

  const equipments = ref<EquipmentConfig>(await getEquipments(commitId))
  const equipmentsSearchResults = computed(() => allEquipmentsByPath())

  function allEquipments() : Equipment[]
  {
    return Object.values(equipments.value)
      .filter(v => v.EquipmentName.Text.toLowerCase().includes(search.value.toLowerCase()))
      .sort((a, b) => a.EquipmentName.Text > b.EquipmentName.Text ? 1 : -1)
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
  <ul>
    <template v-for="(equipments, path) in equipmentsSearchResults" :key="path">
      <li>
        
        <div>{{ path }}</div>
        <ul>
          <template v-for="equipment in equipments" :key="equipment.EquipmentID">
            <li>
              <RouterLink :to="{ name:'equipment', params:{ commitId: commitId, objectId: equipment.EquipmentID }}">
                <span :title="equipment.EquipmentName.Text">{{ equipment.EquipmentName.Text }}</span>
              </RouterLink>
            </li>
          </template>
        </ul>

      </li>
    </template>
  </ul>
</template>

<style scoped>
</style>