<script setup lang="ts">
  defineProps<{value:any, prefix?:string|number}>()
</script>

<template>
  <span class="diff-node plain">
    <template v-if="prefix">
      {{ prefix }}: 
    </template>
    
    <span class="diff-array" v-if="Array.isArray(value)">
      [
        <span class="array-item block" v-for="entry, _key in value">
          <AnyPlain :value="entry" />
        </span>
      ]
    </span>
    <span class="diff-object" v-else-if="typeof value === 'object'">
      {
        <span class="object-item block" v-for="entry, key in value">
          <AnyPlain :value="entry" :prefix="key" />
        </span>
      }
    </span>
    <span class="diff-value" v-else>
      {{ value }}
    </span>
  </span>
</template>

<style scoped>
</style>