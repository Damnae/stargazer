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
    gap: .5em;
  }
  .tab
  {  
    border:none;
    outline:none;
    background:none;
    height: 1em;
    font-size: smaller;
    padding: 0;
  }

  .tab:hover,
  .tab.selected
  {  
    text-decoration: underline;
  }
</style>