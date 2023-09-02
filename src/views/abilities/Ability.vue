<script setup lang="ts">
  import { watch, inject, Ref, computed, } from 'vue'
  import { Ability, AbilityContext, } from '@/scripts/sources/ability';
  import { GamecoreContext } from '@/scripts/sources/gamecore';
  import AnyBlock from '../gamecore/AnyBlock.vue';
  import DynamicValues from './DynamicValues.vue';
  import ShowContext from './ShowContext.vue';
  import BlockLayout from '../gamecore/BlockLayout.vue';

  const props = defineProps<{abilityId:string}>()
  const abilityContext = inject('abilityContext') as Ref<AbilityContext>
  const gamecoreContext = inject('gamecoreContext') as Ref<GamecoreContext>

  watch([props, gamecoreContext], () =>
  {
    if (gamecoreContext.value)
      gamecoreContext.value.AbilityId = props.abilityId
  }, 
  {immediate: true})

  const ability = computed<Ability>(() => abilityContext.value.Abilities?.[props.abilityId])
  
  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
</script>

<template>
  <header>
    <h1>{{ abilityId }}</h1>
  </header>
  <section :key="abilityId">

      <template v-if="ability">
        
        <template v-if="ability.OnAdd">
          <h2>On Add</h2>
          <template v-for="node in ability.OnAdd">
            <AnyBlock :node="node" />
          </template>
        </template>

        <template v-if="ability.OnRemove">
          <h2>On Remove</h2>
          <template v-for="node in ability.OnRemove">
            <AnyBlock :node="node" />
          </template>
        </template>

        <template v-if="ability.OnStart">
          <h2>On Start</h2>
          <template v-for="node in ability.OnStart">
            <AnyBlock :node="node" />
          </template>
        </template>

        <template v-if="ability.Modifiers">
          <h2>Modifiers</h2>
          <ul>
            <li v-for="(_modifier, modifierName) in ability.Modifiers">
              <RouterLink :to="createModifierRoute(modifierName.toString())">
                {{ modifierName }}
              </RouterLink>
            </li>
          </ul>
        </template>

        <h2>Context</h2>
        <BlockLayout :source="ability">
          <span class="flow">Ability Data</span>
        </BlockLayout>
        <DynamicValues v-if="ability.DynamicValues" :dynamicValues="ability.DynamicValues" />
        <ShowContext />

      </template>
      <span v-else class="minor">(Ability {{ abilityId }} not found)</span>

  </section>
</template>

<style scoped>
</style>