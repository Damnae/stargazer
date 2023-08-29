<script setup lang="ts">
  import { computed, inject, } from 'vue'
  import { AbilityContext } from '@/scripts/sources/ability';
  import AnyBlock from '../gamecore/AnyBlock.vue';
  import Modifier from './Modifier.vue';

  const props = defineProps<{abilityId:string}>()
  const getAbilityContext = inject('getAbilityContext') as () => AbilityContext

  const ability = computed(() => getAbilityContext().Abilities?.[props.abilityId])
</script>

<template>
  <header>
    <h1>{{ ability?.Name.replace(/_/g, " ") }}</h1>
  </header>
  <section :key="ability?.Name">
    
      <template v-if="ability">
        <div v-if="ability.OnStart">
          <h2>On Start</h2>
          <template v-for="node in ability.OnStart">
            <AnyBlock :node="node" />
          </template>
        </div>
        <div v-if="ability.Modifiers">
          <h2>Modifiers</h2>
          <template v-for="(modifier, modifierName) in ability.Modifiers">
            <h3>{{ modifierName }}</h3>
            <Modifier :modifier="modifier" />
          </template>
        </div>
      </template>
      <span v-else class="minor">(Ability {{ abilityId }} not found)</span>
    
  </section>
</template>

<style scoped>
</style>