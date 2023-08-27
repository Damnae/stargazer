<script setup lang="ts">
  import { GamecoreNode, } from '@/scripts/sources/gamecore';
import { ref } from 'vue';

  defineProps<{node:GamecoreNode, cosmetic?:boolean}>()
  const open = ref(false)
</script>

<template>
  <div class="block">
    <div @click="open = !open" class="block-header" :class="[cosmetic ? 'cosmetic' : '']">
      <slot>
      </slot>
    </div>
    <div class="block-source">
      <pre v-show="open">{{ node }}</pre>
    </div>
    <div v-show="!open" v-if="$slots.content" class="block-content">
      <slot name="content">
      </slot>
    </div>
  </div>
</template>

<style scoped>
</style>