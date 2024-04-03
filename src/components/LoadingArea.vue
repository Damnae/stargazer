<script setup lang="ts">
  import LoadingNav from './LoadingNav.vue';
  defineProps<{loading:boolean}>()
</script>

<template>
  <span class="loader" v-if="loading">
    <LoadingNav />
  </span>
  <slot v-else>
  </slot>
</template>

<style scoped>
</style>