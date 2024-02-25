<script setup lang="ts">
  import { ref } from 'vue';
  const open = ref(false)
</script>

<template>
  <div class="block">
    <div @click="open = !open" class="block-header">
      <slot>
      </slot>
    </div>
    <div v-show="open" v-if="$slots.content" class="block-content">
      <slot name="content">
      </slot>
    </div>
  </div>
</template>

<style scoped>
</style>