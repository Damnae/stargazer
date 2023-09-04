<script setup lang="ts">
  import ProvideRelicSetContext from './components/ProvideRelicSetContext.vue';
  import Ability from './Ability.vue';

  defineProps<{commitId:string, objectId:number, abilityId:string}>()
</script>

<template> 
  <main class="panel">
    <ProvideRelicSetContext :commitId="commitId" :objectId="objectId">
      <Ability :abilityId="abilityId" />
    </ProvideRelicSetContext>
  </main>
</template>

<style scoped>
</style>