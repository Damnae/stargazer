<script setup lang="ts">
  import { inject } from 'vue';
  import { translatePath } from '@/common/translate';
  import { GamecoreTask, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    BaseTypeList:string[]

    TranslatedBaseTypeList:string[]
  }

  const commitId = inject('commitId') as string
  node.TranslatedBaseTypeList = []
  for (const baseType of node.BaseTypeList)
    node.TranslatedBaseTypeList.push(await translatePath(commitId, baseType))
</script>

<template>
  <BlockLayout :source="node">
    
    <em>{{ evaluateTargetType(node.TargetType) }}</em>
    is on the <em>{{ node.TranslatedBaseTypeList.join(', ') }}</em> path

  </BlockLayout>
</template>

<style scoped>
</style>