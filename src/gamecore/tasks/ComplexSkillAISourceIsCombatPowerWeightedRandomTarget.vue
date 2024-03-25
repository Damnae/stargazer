<script setup lang="ts">
  import { GamecoreTask, } from '@/sources/gamecore';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    AITagKey:string
    IsTarget:boolean
    OneMinusAITag?:boolean
    DefaultAITagValue:
    {
      Value:number
    }
  }

  if (node.AITagKey)
    useHashStore().register(node.AITagKey, true)
</script>

<template>
  <BlockLayout :source="node">

    {{ node.IsTarget === false ? "Source" : "Target" }}'s combat power 
    <template v-if="node.AITagKey">
      by AI tag 
      <em>
        <template v-if="node.OneMinusAITag">
          1&nbsp;-&nbsp;{{ node.AITagKey }}
        </template>
        <template v-else>
          {{ node.AITagKey }}
        </template>
      </em>
    </template>
    <template v-if="node.DefaultAITagValue?.Value">
      with default <em>{{ node.DefaultAITagValue.Value }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>