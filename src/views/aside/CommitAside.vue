<script setup lang="ts">
  import { shallowRef, watch } from 'vue';
  import { useRoute } from 'vue-router';
  
  import MonsterAI from './MonsterAI.vue';

  const component = shallowRef()

  const route = useRoute()
  watch(route, () => 
  {
    switch (route.name)
    {
      case 'monster':
      case 'monsterAbility':
      case 'monsterModifier':
        component.value = MonsterAI
        break;
      default: 
        component.value = undefined
        break;
    }
  }, 
  { immediate:true })
</script>

<template>
  <aside class="panel" v-if="component">
    <component :is="component" />
  </aside>
</template>