<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getEquipment, Equipment, } from '@/scripts/sources/equipment';

  const props = defineProps<{commitId:string, objectId:number}>()

  const equipment = ref<Equipment>(await getEquipment(props.commitId, props.objectId))

  watchEffect(async () => 
  {
    equipment.value = await getEquipment(props.commitId, props.objectId)
  })
</script>

<template>
  <h1>{{ equipment.EquipmentName.Text }}</h1>
  <ul class="navtree">
    <li v-if="equipment.Skill">
      <div>
        Skill
        <span class="minor">{{ equipment.Skill.SkillName.Text }}</span>
        <span class="minor">{{ equipment.Skill.SkillID }}</span>
      </div>
      <ul>
          <li>
            <RouterLink :to="{ name:'equipmentAbility', params:{ commitId: commitId, objectId: objectId, abilityId: equipment.Skill.AbilityName, }}">
              {{ equipment.Skill.AbilityName }}
            </RouterLink>
          </li>
      </ul>
    </li>
  </ul>
  <pre>{{ equipment }}</pre>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>