<script setup lang="ts">
  import { Ref, computed, inject, } from 'vue'
  import { Ability, AbilityContext, } from '@/scripts/sources/ability';
  import AnyBlock from '../gamecore/AnyBlock.vue';
import DynamicValues from './DynamicValues.vue';

  const props = defineProps<{abilityId:string}>()
  const abilityContext = inject('abilityContext') as Ref<AbilityContext>

  const ability = computed<Ability>(() => abilityContext.value.Abilities?.[props.abilityId])
  
  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
</script>

<template>
  <header>
    <h1>{{ abilityId.replace(/_/g, " ") }}</h1>
  </header>
  <section :key="abilityId">

      <template v-if="ability">
        
        <div v-if="ability.OnStart">
          <h2>On Start</h2>
          <template v-for="node in ability.OnStart">
            <AnyBlock :node="node" />
          </template>
        </div>

        <div v-if="ability.Modifiers">
          <h2>Modifiers</h2>
          <ul>
            <li v-for="(_modifier, modifierName) in ability.Modifiers">
              <RouterLink :to="createModifierRoute(modifierName.toString())">
                {{ modifierName }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div v-if="ability.DynamicValues">
          <h2>Dynamic Values</h2>
          <DynamicValues :dynamicValues="ability.DynamicValues" />
        </div>

      </template>
      <span v-else class="minor">(Ability {{ abilityId }} not found)</span>
    
  </section>
</template>

<style scoped>
</style>