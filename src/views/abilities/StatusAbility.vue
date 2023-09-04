<script setup lang="ts">
  import ProvideEmptyContext from './components/ProvideEmptyContext.vue';
  import Ability from './Ability.vue';

  defineProps<{commitId:string, abilityId:string}>()
</script>

<template> 
  <main class="panel">
    <ProvideEmptyContext :commitId="commitId" abilityRouteName="statusAbility" modifierRouteName="statusModifier">
      <Ability :abilityId="abilityId" />
    </ProvideEmptyContext>
  </main>
</template>

<style scoped>
</style>