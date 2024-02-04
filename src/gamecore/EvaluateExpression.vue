<script setup lang="ts">
  import { inject, Ref, } from 'vue';
  import { ExpressionContext,
    DynamicExpression, evaluateDynamicExpression,
  } from '@/sources/gamecore';

  defineProps<{expression?:DynamicExpression|number}>()
  const expressionContext = inject('expressionContext') as Ref<ExpressionContext>
</script>

<template>
  {{ evaluateDynamicExpression(expression, expressionContext) }}
</template>

<style scoped>
</style>