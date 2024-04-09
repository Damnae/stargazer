<script setup lang="ts">
  import { computed, ref, watch, } from 'vue';
  import { useRoute } from 'vue-router'
  import { getLatestCommitId, getCommitVersion, apiRemaining, apiLimit, } from '@/common/datasource';
  import useSettings from '@/common/settings';

  const route = useRoute()
  const [settings, _sessionSettings] = useSettings()

  const commitId = ref(route.params.commitId);
  const latestCommitName = ref('');
  const latestCommitId = ref('');
  const isLatest = computed(() => commitId.value == latestCommitId.value)

  watch(() => route.params.commitId, async newId => 
  {
    commitId.value = newId
    latestCommitId.value = await getLatestCommitId() ?? ''
    latestCommitName.value = await getCommitVersion(latestCommitId.value)
  })
</script>

<template>
  <footer :class="[settings.useCustomRepo ? 'custom' : '']">
    <span v-if="apiLimit > 0" class="minor">
      API: {{ apiRemaining }} / {{ apiLimit }}
    </span>
    <slot />
    <router-link v-if="commitId" :to="{ name:'home' }" class="commitId">
      {{ latestCommitName }} <span class="code">{{ commitId.slice(0, 6) }}</span>
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
    overflow: hidden;
  }  
  footer span
  {
    white-space: nowrap;
  }
  .commitId 
  {
    color:grey;
  }
  .code
  {
    color:#606060;
    font-family: monospace;
    font-size: 1rem;
  }
  .warning 
  {
    color:orangered;
  }
  .custom
  {
    background:darkblue;
    padding-bottom:.25rem;
    border-bottom:.25rem dashed blue;
  }
</style>