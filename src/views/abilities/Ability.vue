<script setup lang="ts">
  import { watch, inject, Ref, computed, } from 'vue'
  import { Ability, TaskContext, } from '@/sources/ability';
  import { ExpressionContext } from '@/sources/gamecore';
  import AnyTask from '@/gamecore/AnyTask.vue';
  import DynamicValues from './components/DynamicValues.vue';
  import ShowContext from './components/ShowContext.vue';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{abilityId:string}>()
  const taskContext = inject('taskContext') as Ref<TaskContext>
  const expressionContext = inject('expressionContext') as Ref<ExpressionContext>

  watch([props, expressionContext], () =>
  {
    if (expressionContext.value)
      expressionContext.value.AbilityId = props.abilityId
  }, 
  {immediate: true})

  const ability = computed<Ability>(() => taskContext.value.Abilities?.[props.abilityId])
  
  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
</script>

<template>
  <header>
    <h1><span class="pretitle">Ability:</span> {{ abilityId }}</h1>
  </header>
  <section :key="abilityId">

      <template v-if="ability">

        <template v-if="ability.TargetInfo">
          <BlockLayout :source="ability.TargetInfo">
            Target: <em>{{ ability.TargetInfo.TargetType }}</em>
            <span class="minor" v-if="ability.TargetInfo.MaxTargetCount">
                (Max {{ ability.TargetInfo.MaxTargetCount }} targets)
            </span>
          </BlockLayout>
        </template>

        <template v-if="ability.OnAdd">
          <h2>On Add</h2>
          <template v-for="node in ability.OnAdd">
            <AnyTask :node="node" />
          </template>
        </template>

        <template v-if="ability.OnRemove">
          <h2>On Remove</h2>
          <template v-for="node in ability.OnRemove">
            <AnyTask :node="node" />
          </template>
        </template>

        <template v-if="ability.OnStart">
          <h2>On Start</h2>
          <template v-for="node in ability.OnStart">
            <AnyTask :node="node" />
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