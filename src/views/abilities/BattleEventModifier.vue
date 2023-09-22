<script setup lang="ts">
  import ProvideBattleEventContext from './components/ProvideBattleEventContext.vue';
  import Modifier from './Modifier.vue';

  defineProps<{commitId:string, objectId:number, modifierId:string}>()
</script>

<template> 
  <main class="panel">
    <ProvideBattleEventContext :commitId="commitId" :objectId="objectId">
      <Modifier :modifierId="modifierId" />
    </ProvideBattleEventContext>
  </main>
</template>

<style scoped>
</style>