<script setup lang="ts">
  import { ref, watch, provide, } from 'vue';
  import { GamecoreContext } from '@/scripts/sources/gamecore';
  import { getRelicSet } from '@/scripts/sources/relicset';
  import { getAbilityContext, AbilityContext, AbilityContextType, } from '@/scripts/sources/ability';

  const props = defineProps<{commitId:string, objectId:number}>()
  
  const gamecoreContext = ref<GamecoreContext>(await getGamecoreContext())
  const abilityContext = ref<AbilityContext>(await getAbilityContext(props.commitId, AbilityContextType.RelicSet))
  
  watch(props, async () => 
  {
    gamecoreContext.value = await getGamecoreContext()
    abilityContext.value = await getAbilityContext(props.commitId, AbilityContextType.RelicSet)
  })

  async function getGamecoreContext()
  {
    const relicSet = await getRelicSet(props.commitId, props.objectId)
    const context:GamecoreContext = 
    {
      Params: {},
      AbilityValues: {},
      AbilityDynamicValues: {},
    }
    for (const skill of Object.values(relicSet.Skills))
      context.Params[`${skill.SetID}_${skill.RequireNum}`] = skill.AbilityParamList
    return context
  }
  
  provide('gamecoreContext', gamecoreContext)
  provide('abilityContext', abilityContext)
  provide('createAbilityRoute', (abilityId:string) : object => { return { name:'relicsetAbility', params:{ commitId: props.commitId, objectId: props.objectId, abilityId: abilityId, } }})
  provide('createModifierRoute', (modifierId:string) : object => { return { name:'relicsetModifier', params:{ commitId: props.commitId, objectId: props.objectId, modifierId: modifierId, } }})
</script>

<template> 
  <slot></slot>
</template>

<style scoped>
</style>