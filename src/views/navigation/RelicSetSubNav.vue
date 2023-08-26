<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getRelicSet, RelicSet, } from '@/scripts/sources/relicset';

  const props = defineProps<{commitId:string, objectId:number}>()

  const relicset = ref<RelicSet>(await getRelicSet(props.commitId, props.objectId))

  watchEffect(async () => 
  {
    relicset.value = await getRelicSet(props.commitId, props.objectId)
  })
</script>

<template>
  <h1>{{ relicset.SetName.Text }}</h1>
  <ul class="navtree">
    <li v-if="relicset.Skills">
      <div>Skills</div>
      <ul>
        <template v-for="skill in relicset.Skills" :key="skill.RankID">
          <li>
            <div>
              {{ skill.RequireNum }} Pieces
            </div>
            <ul v-if="skill.AbilityName">
              <li>
                <RouterLink :to="{ name:'relicsetAbility', params:{ commitId: commitId, objectId: objectId, abilityId: skill.AbilityName, }}">
                  {{ skill.AbilityName }}
                </RouterLink>
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </li>
  </ul>
  <pre>{{ relicset }}</pre>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>