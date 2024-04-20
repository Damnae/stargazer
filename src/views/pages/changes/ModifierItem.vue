<script setup lang="ts">
  import { inject, } from 'vue';
  import { Modifier } from '@/sources/ability';
  import FoldableLayout from '@/components/FoldableLayout.vue';
  import AnyDiff from '@/diff/AnyDiff.vue';

  defineProps<{modifier:Modifier, modifierFrom?:Modifier, isPrevious:boolean}>()
  //const createAbilityRoute = inject<(key:string, from:boolean) => object>('createAbilityRoute') as (key:string, from:boolean) => object
  const createModifierRoute = inject<(key:string, from:boolean) => object>('createModifierRoute') as (key:string, from:boolean) => object
</script>

<template>

  <FoldableLayout :lazy="true">
    <RouterLink v-if="modifier.Name" :to="createModifierRoute(modifier.Name, isPrevious)">
      <em>{{ modifier.Name }}</em>
    </RouterLink>
    <template v-if="modifier.BehaviorFlagList">
      &nbsp;<span class="minor">
        {{ modifier.BehaviorFlagList.join(', ') }}
      </span>
    </template>
    <template #content>
      <div class="block">
        <AnyDiff :from="modifierFrom ?? modifier" :to="modifier" />
      </div>
    </template>
  </FoldableLayout>

</template>

<style scoped>
</style>