<script setup lang="ts">
  import ProvideRelicSetContext from './components/ProvideRelicSetContext.vue';
  import Modifier from './Modifier.vue';

  defineProps<{commitId:string, objectId:number, modifierId:string}>()
</script>

<template> 
  <main class="panel">
    <ProvideRelicSetContext :commitId="commitId" :objectId="objectId">
      <Modifier :modifierId="modifierId" />
    </ProvideRelicSetContext>
  </main>
</template>

<style scoped>
</style>