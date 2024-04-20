<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { diff, DiffNode, DiffNodeChange, } from './diff';
  import AnyDiffNode from './AnyDiffNode.vue';

  const props = defineProps<{from:any, to:any}>()
  let diffNode = ref(<DiffNode>{})
  watch([props], async () => 
  {
    diffNode.value = diff(props.from, props.to)
  }, { immediate:true })
</script>

<template>

  <div class="diff">
    <div v-if="diffNode.FromValue !== diffNode.ToValue && diffNode.Change == DiffNodeChange.Same">
      No Change Detected (string equality: {{ JSON.stringify(diffNode.FromValue) == JSON.stringify(diffNode.ToValue) }})
    </div>
    <AnyDiffNode :diffNode="diffNode" />
  </div>

</template>

<style scoped>
</style>