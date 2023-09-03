<script setup lang="ts">
  import { ref } from 'vue';

  const open = ref(true)
  function toggle()
  {
    open.value = !open.value
  }
</script>

<template>
    <div v-if="$slots.header" @click="toggle()" class="navtree-header" :class="open ? 'navtree-open' : 'navtree-closed'">
        <slot name="header" />
    </div>
    <ul class="navtree" v-if="open">
        <slot />
    </ul>
</template>

<style scoped>
</style>