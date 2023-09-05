<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const commitId = ref(route.params.commitId);
  watch(
    () => route.params.commitId,
    async newId => commitId.value = newId 
  )
</script>

<template>
  <footer>
    <slot />
    <router-link v-if="commitId" :to="{ name:'home' }" class="commitId">
      {{ commitId }}
    </router-link>
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
</style>