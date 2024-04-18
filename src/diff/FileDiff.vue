<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { retrieveJson } from '@/common/datasource';
  import { diff, DiffNode, DiffNodeChange, } from './diff';
  import AnyDiffNode from './AnyDiffNode.vue';

  const props = defineProps<{fromCommitId:string, toCommitId:string, path:string}>()

  let diffNode = ref(<DiffNode>{})
  watch([props], async () => 
  {
    const fromData = await retrieveJson(props.path, props.fromCommitId, false)
    const toData = await retrieveJson(props.path, props.toCommitId, false)
    diffNode.value = diff(fromData, toData)
  }, { immediate:true })
</script>

<template>

  <div>
    <span class="minor">
      {{ path }} 
      <template v-if="fromCommitId != toCommitId">
        {{ fromCommitId.slice(0, 6) }}&nbsp;-&#8288;>&nbsp;{{ toCommitId.slice(0, 6) }}
      </template>
    </span>
  </div>
  <div class="diff">
    <div v-if="fromCommitId != toCommitId && diffNode.Change == DiffNodeChange.Same">
      No Change Detected (string equality: {{ JSON.stringify(diffNode.FromValue) == JSON.stringify(diffNode.ToValue) }})
    </div>
    <AnyDiffNode :diffNode="diffNode" />
  </div>

</template>

<style scoped>
</style>