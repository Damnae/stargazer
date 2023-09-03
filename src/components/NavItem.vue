<script setup lang="ts">
</script>

<template>
  <li v-if="$slots.default">
    <slot />
  </li>
</template>

<style scoped>
</style>