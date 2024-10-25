<script setup lang="ts">
  import useHashStore from '@/common/hashstore';

  const props = defineProps<{dynamicKey:string|{Value:string}, contextScope?:string}>()

  if (typeof(props.dynamicKey) == 'string')
    useHashStore().register(props.dynamicKey, true)
  else if (typeof(props.dynamicKey) == 'object')
    useHashStore().register(props.dynamicKey.Value, true)
</script>

<template>
  <em v-if="contextScope">{{ contextScope }}.</em>
  <template v-if="typeof(dynamicKey) == 'string'">
      <em>{{ dynamicKey }}</em>
  </template>
  <template v-else-if="typeof(dynamicKey) == 'object'">
      <em>{{ dynamicKey.Value }}</em>
  </template>
  <template v-else>
      <em>?{{ dynamicKey }}?</em>
  </template>
</template>

<style scoped>
</style>