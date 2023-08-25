<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { getAbilityContext, AbilityContext, AbilityContextType, } from '../../scripts/sources/ability';

  const props = defineProps<{commitId:string, objectId:number, abilityId:string}>()
  
  const abilityContext = ref<AbilityContext>(await getAbilityContext(props.commitId, AbilityContextType.RelicSet))
  watch(props, async () => abilityContext.value = await getAbilityContext(props.commitId, AbilityContextType.RelicSet))
</script>

<template> 
  <main class="panel">
  </main>
  <aside class="panel">
    <h1>Context</h1>
    <pre>{{ abilityContext }}</pre>
  </aside>
</template>

<style scoped>
</style>