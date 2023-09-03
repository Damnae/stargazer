<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getEquipment, Equipment, } from '@/scripts/sources/equipment';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'

  const props = defineProps<{commitId:string, objectId:number}>()

  const equipment = ref<Equipment>(await getEquipment(props.commitId, props.objectId))

  watchEffect(async () => 
  {
    equipment.value = await getEquipment(props.commitId, props.objectId)
  })
</script>

<template>
  <h1>{{ equipment.EquipmentName.Text }}</h1>
  <NavTree>
    <NavItem v-if="equipment.Skill">
      <NavTree>
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
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>