<script setup lang="ts">
  import ProvideRogueBuffContext from './components/ProvideRogueBuffContext.vue';
  import Modifier from './Modifier.vue';

  defineProps<{commitId:string, objectId:number, modifierId:string}>()
</script>

<template> 
  <main class="panel">
    <ProvideRogueBuffContext :commitId="commitId" :objectId="objectId">
      <Modifier :modifierId="modifierId" />
    </ProvideRogueBuffContext>
  </main>
</template>

<style scoped>
</style>