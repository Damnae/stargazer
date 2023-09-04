<script setup lang="ts">
  import ProvideEquipmentContext from './components/ProvideEquipmentContext.vue';
  import Ability from './Ability.vue';

  defineProps<{commitId:string, objectId:number, abilityId:string}>()
</script>

<template> 
  <main class="panel">
    <ProvideEquipmentContext :commitId="commitId" :objectId="objectId">
      <Ability :abilityId="abilityId" />
    </ProvideEquipmentContext>
  </main>
</template>

<style scoped>
</style>