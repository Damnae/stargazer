<script setup lang="ts">
  import { ref, } from 'vue';
  import { RelicRecommendConfig, getRelicRecommends } from '@/sources/relicrecommend';
  import { AvatarConfig, getAvatars } from '@/sources/avatar';
  import { RelicSetConfig, getRelicSets } from '@/sources/relicset';

  const props = defineProps<{commitId:string}>()
  const relicRecommends = ref<RelicRecommendConfig>(await getRelicRecommends(props.commitId))
    
  const avatars = ref<AvatarConfig>(await getAvatars(props.commitId))
  const relicsets = ref<RelicSetConfig>(await getRelicSets(props.commitId))
</script>

<template>
  <main class="panel">
    <header>
      <h1>Relic Recommendations</h1>
    </header>
    <section>

      <div v-for="relicRecommend in relicRecommends">
        <h2 :title="relicRecommend.AvatarID.toString()">{{ avatars[relicRecommend.AvatarID]?.AvatarName.Text ?? relicRecommend.AvatarID }}</h2>
        <h3>Sets</h3>
        <ul>
          <li v-for="setId in relicRecommend.Set4IDList.concat(relicRecommend.Set2IDList)" >
            <RouterLink :to="{ name:'relicset', params:{ commitId: commitId, objectId: setId }}">
              <span :title="setId.toString()">{{ relicsets[setId]?.SetName.Text ?? setId }}</span>
            </RouterLink>
          </li>
        </ul>
        <h3>Stats</h3>
        <ul>
          <li v-for="part in relicRecommend.PropertyList">
            {{ part.RelicType }} {{ part.PropertyType }}
          </li>
        </ul>
      </div>

    </section>
  </main>
</template>

<style scoped>
</style>