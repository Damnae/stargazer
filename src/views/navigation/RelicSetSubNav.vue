<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getRelicSet, RelicSet, } from '@/scripts/sources/relicset';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'

  const props = defineProps<{commitId:string, objectId:number}>()

  const relicset = ref<RelicSet>(await getRelicSet(props.commitId, props.objectId))

  watchEffect(async () => 
  {
    relicset.value = await getRelicSet(props.commitId, props.objectId)
  })
</script>

<template>
  <h1>{{ relicset.SetName.Text }}</h1>
  <NavTree>
    <NavItem v-if="relicset.Skills">
      <NavTree>
        <template #header>Skills</template>
        <template v-for="skill in relicset.Skills" :key="skill.RankID">
          <NavItem>
            <NavTree v-if="skill.AbilityName">
              <template #header>{{ skill.RequireNum }} Pieces</template>
              <NavItem>
                <RouterLink :to="{ name:'relicsetAbility', params:{ commitId: commitId, objectId: objectId, abilityId: skill.AbilityName, }}">
                  {{ skill.AbilityName }}
                </RouterLink>
              </NavItem>
            </NavTree>
          </NavItem>
        </template>
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