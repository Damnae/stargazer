<script setup lang="ts">
  import { inject, } from 'vue';
  import { Ability } from '@/sources/ability';
  import FoldableLayout from '@/components/FoldableLayout.vue';
  import AnyDiff from '@/diff/AnyDiff.vue';

  defineProps<{ability:Ability, abilityFrom?:Ability, isPrevious:boolean}>()
  const createAbilityRoute = inject<(key:string, from:boolean) => object>('createAbilityRoute') as (key:string, from:boolean) => object
  const createModifierRoute = inject<(key:string, from:boolean) => object>('createModifierRoute') as (key:string, from:boolean) => object
</script>

<template>

  <FoldableLayout :lazy="true">
    <RouterLink v-if="ability.Name" :to="createAbilityRoute(ability.Name, isPrevious)">
      <em>{{ ability.Name }}</em>
    </RouterLink>
    <div class="block" v-for="modifier in ability.Modifiers">
      <RouterLink v-if="modifier.Name" :to="createModifierRoute(modifier.Name, isPrevious)">
        <em>{{ modifier.Name }}</em>
      </RouterLink>
      <template v-if="modifier.BehaviorFlagList">
        &nbsp;<span class="minor">
          {{ modifier.BehaviorFlagList.join(', ') }}
        </span>
      </template>
    </div>
    <template #content>
      <div class="block">
        <AnyDiff :from="abilityFrom ?? ability" :to="ability" />
      </div>
    </template>
  </FoldableLayout>

</template>

<style scoped>
</style>