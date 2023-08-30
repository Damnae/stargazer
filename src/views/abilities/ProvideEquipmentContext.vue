<script setup lang="ts">
  import { ref, watch, provide, } from 'vue';
  import { GamecoreContext } from '@/scripts/sources/gamecore';
  import { getEquipment } from '@/scripts/sources/equipment';
  import { getAbilityContext, AbilityContext, AbilityContextType, } from '@/scripts/sources/ability';

  const props = defineProps<{commitId:string, objectId:number}>()
  
  const gamecoreContext = ref<GamecoreContext>(await getGamecoreContext())
  const abilityContext = ref<AbilityContext>(await getAbilityContext(props.commitId, AbilityContextType.Equipment))

  watch(props, async () => 
  {
    gamecoreContext.value = await getGamecoreContext()
    abilityContext.value = await getAbilityContext(props.commitId, AbilityContextType.Equipment)
  })

  async function getGamecoreContext()
  {
    const equipment = await getEquipment(props.commitId, props.objectId)
    const context:GamecoreContext = 
    {
      Params: 
      {
        "": equipment.Skill.ParamList
      },
    }
    return context
  }

  provide('gamecoreContext', gamecoreContext)
  provide('abilityContext', abilityContext)
  provide('createAbilityRoute', (abilityId:string) : object => { return { name:'equipmentAbility', params:{ commitId: props.commitId, objectId: props.objectId, abilityId: abilityId, } }})
  provide('createModifierRoute', (modifierId:string) : object => { return { name:'equipmentModifier', params:{ commitId: props.commitId, objectId: props.objectId, modifierId: modifierId, } }})
</script>

<template> 
  <slot></slot>
</template>

<style scoped>
</style>