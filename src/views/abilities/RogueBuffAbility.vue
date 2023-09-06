<script setup lang="ts">
  import ProvideNeutralContext from './components/ProvideNeutralContext.vue';
  import Ability from './Ability.vue';

  defineProps<{commitId:string, abilityId:string}>()
</script>

<template> 
  <main class="panel">
    <!-- TODO Proper context -->
    <ProvideNeutralContext :commitId="commitId" abilityRouteName="rogueBuffAbility" modifierRouteName="rogueBuffModifier">
      <Ability :abilityId="abilityId" />
    </ProvideNeutralContext>
  </main>
</template>

<style scoped>
</style>