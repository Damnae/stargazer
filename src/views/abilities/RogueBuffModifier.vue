<script setup lang="ts">
  import ProvideNeutralContext from './components/ProvideNeutralContext.vue';
  import Modifier from './Modifier.vue';

  defineProps<{commitId:string, modifierId:string}>()
</script>

<template> 
  <main class="panel">
    <!-- TODO Proper context -->
    <ProvideNeutralContext :commitId="commitId" abilityRouteName="rogueBuffAbility" modifierRouteName="rogueBuffModifier">
      <Modifier :modifierId="modifierId" />
    </ProvideNeutralContext>
  </main>
</template>

<style scoped>
</style>