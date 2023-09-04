<script setup lang="ts">
  import ProvideAvatarContext from './components/ProvideAvatarContext.vue';
  import Modifier from './Modifier.vue';

  defineProps<{commitId:string, objectId:number, modifierId:string}>()
</script>

<template> 
  <main class="panel">
    <ProvideAvatarContext :commitId="commitId" :objectId="objectId">
      <Modifier :modifierId="modifierId" />
    </ProvideAvatarContext>
  </main>
</template>

<style scoped>
</style>