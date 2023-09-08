<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { cleanupMarkup, cleanupNumber } from '@/common/common';
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

    equipment.value.Skill.ParamList
  })

  function evaluateDescription(equipment:Equipment) : string
  {
    if (equipment.Skill)
    {
      let description = equipment.Skill.SkillDesc.Text
      for (const [index, param] of equipment.Skill.ParamList.entries())
        description = description.replace(`#${index + 1}[i]`, cleanupNumber(param.Value))
      return cleanupMarkup(description)
    }
    return ''
  }
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
      <span class="minor">{{ evaluateDescription(equipment) }}</span>
    </p>
  </div>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>