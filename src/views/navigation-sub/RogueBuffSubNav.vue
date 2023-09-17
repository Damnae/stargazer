<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { evaluateDescription } from '@/sources/gamecore';
  import { RogueBuffRanks, getRogueBuff } from '@/sources/roguebuff';
  import LoadingNav from '@/components/LoadingNav.vue';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'

  const props = defineProps<{commitId:string, objectId:number}>()

  const rogueBuff = ref<RogueBuffRanks>()

  const loading = ref(true)
  watchEffect(async () => 
  {
    loading.value = true
    rogueBuff.value = await getRogueBuff(props.commitId, props.objectId)
    loading.value = false
  })

  function getAbilities(rogueBuffRanks:RogueBuffRanks):string[]
  {
    return [...new Set(Object.values(rogueBuffRanks).map(r => r.MazeBuff.InBattleBindingKey))]
  }
  function getModifiers(rogueBuffRanks:RogueBuffRanks):string[]
  {
    return [...new Set(Object.values(rogueBuffRanks).map(r => r.MazeBuff.ModifierName))]
  }
</script>

<template>
  <div v-if="loading">
    <LoadingNav />
  </div>
  <div v-else-if="rogueBuff" :key="objectId">
    <h1>{{ rogueBuff[1].MazeBuff?.BuffName.Text }}</h1>
    
    <NavTree>
      
      <NavItem>
        <NavTree :startsOpen="true">
          <template #header>Abilities</template>
          <NavItem v-for="abilityName in getAbilities(rogueBuff)">
            <RouterLink :to="{ name:'rogueBuffAbility', params:{ commitId: commitId, objectId: objectId, abilityId: abilityName, }}">
              {{ abilityName }}
            </RouterLink>
          </NavItem>
        </NavTree>
      </NavItem>

      <NavItem>
        <NavTree :startsOpen="true">
          <template #header>Modifiers</template>
          <NavItem v-for="modifierName in getModifiers(rogueBuff)">
            <RouterLink :to="{ name:'rogueBuffModifier', params:{ commitId: commitId, objectId: objectId, modifierId: modifierName, }}">
              {{ modifierName }}
            </RouterLink>
          </NavItem>
        </NavTree>
      </NavItem>

    </NavTree>

    <p v-for="rank, index in Object.values(rogueBuff)" class="minor">
      <h2>Rank {{ index + 1 }}</h2>
      {{ evaluateDescription(rank.MazeBuff?.BuffDesc.Text, rank.MazeBuff?.ParamList) }}
    </p>

  </div>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>