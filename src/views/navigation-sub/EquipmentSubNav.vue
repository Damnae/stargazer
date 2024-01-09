<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { cleanupNumber } from '@/common/common';
  import { evaluateDescription } from '@/sources/gamecore';
  import { getEquipment, Equipment, } from '@/sources/equipment';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'
  import LoadingNav from '@/components/LoadingNav.vue';

  const props = defineProps<{commitId:string, objectId:number}>()

  const equipment = ref<Equipment>()

  const loading = ref(true)
  watchEffect(async () => 
  {
    loading.value = true
    equipment.value = await getEquipment(props.commitId, props.objectId)
    loading.value = false
  })
</script>

<template>
  <div v-if="loading">
    <LoadingNav />
  </div>
  <div v-else-if="equipment" :key="objectId">
    <h1>{{ equipment.EquipmentName.Text }}</h1>
    <NavTree>
      <NavItem v-if="equipment.Skill">
        <NavTree :startsOpen="true">
          <template #header>
            Skill
            <span class="minor">{{ equipment.Skill.SkillName.Text }}</span>
            <span class="minor">{{ equipment.Skill.SkillID }}</span>
          </template>
          <NavItem>
            <RouterLink :to="{ name:'equipmentAbility', params:{ commitId: commitId, objectId: objectId, abilityId: equipment.Skill.AbilityName, }}">
              {{ equipment.Skill.AbilityName }}
            </RouterLink>
          </NavItem>
        </NavTree>
      </NavItem>
    </NavTree>
    <p>
      <h2>Effect</h2>
      <div v-for="property in equipment.Skill.AbilityProperty">
        {{ property.PropertyType }}: {{ cleanupNumber(property.Value?.Value) }}
      </div>
      <span class="minor">{{ evaluateDescription(equipment.Skill?.SkillDesc.Text, equipment.Skill?.ParamList) }}</span>
    </p>
  </div>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>