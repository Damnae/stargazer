<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { getAbilityContext, AbilityContext, AbilityContextType, } from '../../scripts/sources/ability';
  import Ability from './Ability.vue';

  const props = defineProps<{commitId:string, objectId:number, abilityId:string}>()
  
  const abilityContext = ref<AbilityContext>(await getAbilityContext(props.commitId, AbilityContextType.Equipment))
  watch(props, async () => abilityContext.value = await getAbilityContext(props.commitId, AbilityContextType.Equipment))
</script>

<template> 
  <main class="panel">
    <Ability :abilityId="abilityId" :abilityContext="abilityContext" />
  </main>
  <aside class="panel">
    <h1>Context</h1>
  </aside>
</template>

<style scoped>
</style>