
<script setup lang="ts">
  import { ref, computed, inject, Ref, } from 'vue'
  import { RouterLink, } from 'vue-router';
  import { Grouped, } from '@/common/common';
  import { RogueBuffRanks, RogueBuffConfig, getRogueBuffs } from '@/sources/roguebuff';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'

  const commitId = inject<string>('commitId') as string
  const search = inject<Ref<string>>('search') as Ref<string>

  const rogueBuffs = ref<RogueBuffConfig>(await getRogueBuffs(commitId))
  const rogueBuffsSearchResults = computed(() => allARogueBuffsByPath())

  function allRogueBuffs() : RogueBuffRanks[]
  {
    return Object.values(rogueBuffs.value)
      .map(v => v as RogueBuffRanks)
      .filter(v => v[1].SearchKeywords.some(k => k.includes(search.value.toLowerCase())))
      .sort((a, b) => a[1].MazeBuff && b[1].MazeBuff ? a[1].MazeBuff.BuffName.Text > b[1].MazeBuff.BuffName.Text ? 1 : -1 : 0)
  }

  function allARogueBuffsByPath() : Grouped<RogueBuffRanks>
  {
    return allRogueBuffs()
      .reduce((paths:Grouped<RogueBuffRanks>, rogueBuffRank:RogueBuffRanks) => 
      {
        if (rogueBuffRank[1]?.MazeBuff)
        {
          const key = rogueBuffRank[1]?.BuffType?.RogueBuffTypeTextmapID.Text ?? 'Unknown';
          const rogueBuffs = (paths[key] || []);
          rogueBuffs.push(rogueBuffRank);
          paths[key] = rogueBuffs;
        }
        return paths;
      }, {})
  }
</script>

<template>
  <NavItem v-for="(buffs, pathName) in rogueBuffsSearchResults" :key="pathName">

    <NavTree>
      <template #header>{{ pathName }}</template>
      <NavItem v-for="buff in buffs" :key="buff[1].MazeBuffID">
        <RouterLink :to="{ name:'rogueBuff', params:{ commitId: commitId, objectId: buff[1].MazeBuffID }}">
          <span :title="buff[1].MazeBuff?.BuffName.Text">{{ buff[1].MazeBuff?.BuffName.Text }}</span>
        </RouterLink>
      </NavItem>
    </NavTree>

  </NavItem>
</template>

<style scoped>
</style>