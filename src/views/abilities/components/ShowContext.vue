<script setup lang="ts">
  import { Ref, inject } from 'vue';
  import { ExpressionContext } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  
  const expressionContext = inject('expressionContext') as Ref<ExpressionContext>
</script>

<template>
  <BlockLayout :source="expressionContext">
    <span class="flow">Expression Context</span>
  </BlockLayout>
</template>

<style scoped>
</style>