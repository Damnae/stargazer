<script setup lang="ts">
  import { ref } from 'vue';

  defineProps<{source?:any, cosmetic?:boolean}>()
  const open = ref(false)
</script>

<template>
  <div class="block">
    <div @click="open = !open" class="block-header" :class="[cosmetic ? 'cosmetic' : '']">
      <slot>
      </slot>
    </div>
    <div v-if="source" class="block-source">
      <pre v-show="open">{{ source }}</pre>
    </div>
    <div v-show="!open" v-if="$slots.content" class="block-content">
      <slot name="content">
      </slot>
    </div>
  </div>
</template>

<style scoped>
</style>