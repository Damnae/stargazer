<script setup lang="ts">
  import { computed, ref, watch, } from 'vue';
  import { useRoute } from 'vue-router'
  import { getLatestCommitId, } from '@/common/datasource';

  const route = useRoute()

  const commitId = ref(route.params.commitId);
  const latestCommitId = ref('');
  const isLatest = computed(() => commitId.value == latestCommitId.value)

  watch(() => route.params.commitId, async newId => 
  {
    commitId.value = newId
    latestCommitId.value = await getLatestCommitId() ?? ''
  })

</script>

<template>
  <footer>
    <slot />
    <router-link v-if="commitId" :to="{ name:'home' }" class="commitId">
      {{ commitId }}
    </router-link>
    <span v-if="isLatest" class="minor">
      (Latest)
    </span>
    <span v-else-if="commitId && latestCommitId" class="warning">
      (Not Latest)
    </span>
  </footer>
</template>

<style scoped>
  footer
  {
    display: flex;
    flex-direction: row;
    place-content: center;
    gap: 1rem;
  }
  .commitId 
  {
    color:grey;
  }
  .warning 
  {
    color:orangered;
  }
</style>