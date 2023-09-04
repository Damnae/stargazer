<script setup lang="ts">
  import ProvideMonsterContext from './components/ProvideMonsterContext.vue';
  import Ability from './Ability.vue';

  defineProps<{commitId:string, objectId:number, abilityId:string}>()
</script>

<template> 
  <main class="panel">
    <ProvideMonsterContext :commitId="commitId" :objectId="objectId">
      <Ability :abilityId="abilityId" />
    </ProvideMonsterContext>
  </main>
</template>

<style scoped>
</style>