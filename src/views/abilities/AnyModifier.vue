<script setup lang="ts">
  import ProvideNeutralContext from './components/ProvideNeutralContext.vue';
  import Modifier from './Modifier.vue';

  defineProps<{commitId:string, modifierId:string}>()
</script>

<template> 
  <main class="panel">
    <ProvideNeutralContext :commitId="commitId">
      <Modifier :modifierId="modifierId" />
    </ProvideNeutralContext>
  </main>
</template>

<style scoped>
</style>