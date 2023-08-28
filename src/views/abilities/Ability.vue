<script setup lang="ts">
  import { ref, watch, } from 'vue'
  import { AbilityContext } from '../../scripts/sources/ability';
  import AnyBlock from '../gamecore/AnyBlock.vue';
  import Modifier from './Modifier.vue';

  const props = defineProps<{abilityId:string, abilityContext:AbilityContext}>()

  const ability = ref(props.abilityContext.Abilities[props.abilityId])
  watch(props, () => ability.value = props.abilityContext.Abilities[props.abilityId])
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
            <AnyBlock :node="node" :abilityContext="abilityContext" />
          </template>
        </div>
        <div v-if="ability.Modifiers">
          <h2>Modifiers</h2>
          <template v-for="(modifier, modifierName) in ability.Modifiers">
            <h3>{{ modifierName }}</h3>
            <Modifier :modifier="modifier" :abilityContext="abilityContext" />
          </template>
        </div>
      </template>
      <span v-else class="minor">(Ability not found)</span>
    
  </section>
</template>

<style scoped>
</style>