<script setup lang="ts">
  import { GamecoreTargetType, evaluateTargetType, } from '@/sources/gamecore';
  defineProps<{target?:GamecoreTargetType}>()
</script>

<template>
  {{ evaluateTargetType(target) }}
</template>

<style scoped>
</style>