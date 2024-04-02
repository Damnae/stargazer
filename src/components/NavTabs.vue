<script setup lang="ts">
  defineProps<{tabs:string[], selected:string}>()
  defineEmits(['update:selected'])
</script>

<template>
  <div class="tabs">
    <button v-for="name in tabs" @click="$emit('update:selected', name)" class="tab" :class="selected == name ? 'selected' : ''" >
      {{ name }}
    </button>
  </div>
</template>

<style scoped>
  .tabs
  {
    display:flex;
    flex-direction: row;
    justify-content: center;
    font-size: smaller;
    gap: .5em;
  }
  .tab
  {  
    border:none;
    outline:none;
    background:none;
    height: 1.3em;
    padding: 0;
  }

  .tab:hover,
  .tab.selected
  {  
    text-decoration: underline;
  }
</style>