<script setup lang="ts">
  import { ref, inject, } from 'vue';
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';
  import { TargetAliasConfig, getTargetAliases } from '@/sources/targetalias';

  const props = defineProps<{node:GamecoreTask}>()
  const commitId = inject<string>('commitId') as string
  const node = props.node as unknown as 
  {
    Alias:string
  }
  const aliases = ref<TargetAliasConfig>(await getTargetAliases(commitId))
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Alias: <em>{{ node.Alias }}</em></span>
    <template #content>
      <template v-if="aliases.AliasDict[node.Alias]">
        <AnyTask :node="aliases.AliasDict[node.Alias]" />
      </template>
      <template v-else>
        <span class="minor">Not Found</span>
      </template>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>