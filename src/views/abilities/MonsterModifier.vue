<script setup lang="ts">
  import ProvideMonsterContext from './ProvideMonsterContext.vue';
  import Modifier from './Modifier.vue';

  defineProps<{commitId:string, objectId:number, modifierId:string}>()
</script>

<template> 
  <main class="panel">
    <ProvideMonsterContext :commitId="commitId" :objectId="objectId">
      <Modifier :modifierId="modifierId" />
    </ProvideMonsterContext>
  </main>
</template>

<style scoped>
</style>