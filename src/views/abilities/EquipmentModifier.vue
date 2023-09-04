<script setup lang="ts">
  import ProvideEquipmentContext from './components/ProvideEquipmentContext.vue';
  import Modifier from './Modifier.vue';

  defineProps<{commitId:string, objectId:number, modifierId:string}>()
</script>

<template> 
  <main class="panel">
    <ProvideEquipmentContext :commitId="commitId" :objectId="objectId">
      <Modifier :modifierId="modifierId" />
    </ProvideEquipmentContext>
  </main>
</template>

<style scoped>
</style>