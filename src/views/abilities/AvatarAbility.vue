<script setup lang="ts">
  import ProvideAvatarContext from './components/ProvideAvatarContext.vue';
  import Ability from './Ability.vue';

  defineProps<{commitId:string, objectId:number, abilityId:string}>()
</script>

<template> 
  <main class="panel">
    <ProvideAvatarContext :commitId="commitId" :objectId="objectId">
      <Ability :abilityId="abilityId" />
    </ProvideAvatarContext>
  </main>
</template>

<style scoped>
</style>