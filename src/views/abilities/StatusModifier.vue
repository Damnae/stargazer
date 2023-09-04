<script setup lang="ts">
  import ProvideEmptyContext from './components/ProvideEmptyContext.vue';
  import Modifier from './Modifier.vue';

  defineProps<{commitId:string, modifierId:string}>()
</script>

<template> 
  <main class="panel">
    <ProvideEmptyContext :commitId="commitId" abilityRouteName="statusAbility" modifierRouteName="statusModifier">
      <Modifier :modifierId="modifierId" />
    </ProvideEmptyContext>
  </main>
</template>

<style scoped>
</style>