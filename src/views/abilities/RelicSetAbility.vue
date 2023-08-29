<script setup lang="ts">
  import { ref, watch, provide, } from 'vue';
  import { getAbilityContext, AbilityContext, AbilityContextType, } from '../../scripts/sources/ability';
  import Ability from './Ability.vue';

  const props = defineProps<{commitId:string, objectId:number, abilityId:string}>()
  
  const abilityContext = ref<AbilityContext>(await getAbilityContext(props.commitId, AbilityContextType.RelicSet))
  watch(props, async () => abilityContext.value = await getAbilityContext(props.commitId, AbilityContextType.RelicSet))
  
  provide('getAbilityContext', () => abilityContext.value)
  provide('createAbilityRoute', (abilityId:string) : object => { return { name:'relicsetAbility', params:{ commitId: props.commitId, objectId: props.objectId, abilityId: abilityId, } }})
</script>

<template> 
  <main class="panel">
    <Ability :abilityId="abilityId" />
  </main>
</template>

<style scoped>
</style>