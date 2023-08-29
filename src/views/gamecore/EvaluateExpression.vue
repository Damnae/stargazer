<script setup lang="ts">
  import { inject, Ref, } from 'vue';
  import { GamecoreContext,
    DynamicExpression, evaluateDynamicExpression,
  } from '@/scripts/sources/gamecore';

  defineProps<{expression?:DynamicExpression}>()
  const gamecoreContext = inject('gamecoreContext') as Ref<GamecoreContext>
</script>

<template>
  {{ evaluateDynamicExpression(expression, gamecoreContext) }}
</template>

<style scoped>
</style>