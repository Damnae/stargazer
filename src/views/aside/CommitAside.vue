<script setup lang="ts">
  import { shallowRef, watch } from 'vue';
  import { useRoute } from 'vue-router';
  
  import AvatarAI from './AvatarAI.vue';
  import MonsterAI from './MonsterAI.vue';

  const component = shallowRef()

  const route = useRoute()
  watch(route, () => 
  {
    switch (route.name)
    {
      case 'avatar':
        component.value = AvatarAI
        break;
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