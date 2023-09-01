<script setup lang="ts">
  import { ref, watch, provide, } from 'vue';
  import { GamecoreContext } from '@/scripts/sources/gamecore';
  import { getAbilityContext, AbilityContext, AbilityContextType, } from '@/scripts/sources/ability';

  const props = defineProps<{commitId:string, abilityRouteName?:string, modifierRouteName?:string}>()
  
  const gamecoreContext = ref<GamecoreContext>(await getGamecoreContext())
  const abilityContext = ref<AbilityContext>(await getAbilityContext(props.commitId, AbilityContextType.All))

  watch(props, async () => 
  {
    gamecoreContext.value = await getGamecoreContext()
    abilityContext.value = await getAbilityContext(props.commitId, AbilityContextType.All)
  })

  async function getGamecoreContext()
  {
    const context:GamecoreContext = 
    {
      Params: {},
      AbilityValues: {},
      AbilityDynamicValues: {},
    }
    return context
  }

  provide('gamecoreContext', gamecoreContext)
  provide('abilityContext', abilityContext)
  provide('createAbilityRoute', (abilityId:string) : object => { return { name: props.abilityRouteName ?? 'ability', params:{ commitId: props.commitId, abilityId: abilityId, } }})
  provide('createModifierRoute', (modifierId:string) : object => { return { name: props.modifierRouteName ?? 'modifier', params:{ commitId: props.commitId, modifierId: modifierId, } }})
</script>

<template>
  <div class="nocontext minor">(Context is missing)</div>
  <slot></slot>
</template>

<style scoped>
  .nocontext
  {
    position:absolute;
    top:.5rem;
    left:.5rem;
  }
</style>