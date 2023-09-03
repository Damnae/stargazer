<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getRelicSet, RelicSet, } from '@/scripts/sources/relicset';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'

  const props = defineProps<{commitId:string, objectId:number}>()

  const relicset = ref<RelicSet>()

  watchEffect(async () => 
  {
    relicset.value = await getRelicSet(props.commitId, props.objectId)
  })
</script>

<template>
  <template v-if="relicset" :key="objectId">
    <h1>{{ relicset.SetName.Text }}</h1>
    <NavTree>
      <NavItem v-if="relicset.Skills">
        <NavTree :startsOpen="true">
          <template #header>Skills</template>
          <NavItem v-for="skill, rank in relicset.Skills" :key="rank">
            <NavTree :startsOpen="true">
              <template #header>{{ skill.RequireNum }} Pieces</template>
              <NavItem v-if="skill.AbilityName">
                <RouterLink :to="{ name:'relicsetAbility', params:{ commitId: commitId, objectId: objectId, abilityId: skill.AbilityName, }}">
                  {{ skill.AbilityName }}
                </RouterLink>
              </NavItem>
            </NavTree>
          </NavItem>
        </NavTree>
      </NavItem>
    </NavTree>
  </template>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>