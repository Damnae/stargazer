<script setup lang="ts">
  import ProvideRogueBuffContext from './components/ProvideRogueBuffContext.vue';
  import Ability from './Ability.vue';

  defineProps<{commitId:string, objectId:number, abilityId:string}>()
</script>

<template> 
  <main class="panel">
    <ProvideRogueBuffContext :commitId="commitId" :objectId="objectId">
      <Ability :abilityId="abilityId" />
    </ProvideRogueBuffContext>
  </main>
</template>

<style scoped>
</style>