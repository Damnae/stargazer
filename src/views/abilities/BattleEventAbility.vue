<script setup lang="ts">
  import ProvideBattleEventContext from './components/ProvideBattleEventContext.vue';
  import Ability from './Ability.vue';

  defineProps<{commitId:string, objectId:number, abilityId:string}>()
</script>

<template> 
  <main class="panel">
    <ProvideBattleEventContext :commitId="commitId" :objectId="objectId">
      <Ability :abilityId="abilityId" />
    </ProvideBattleEventContext>
  </main>
</template>

<style scoped>
</style>