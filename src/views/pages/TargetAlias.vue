<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { TargetAliasConfig, getTargetAliases } from '@/sources/targetalias';
  import AnyTask from '@/gamecore/AnyTask.vue';
  import { GamecoreTargetType } from '@/sources/gamecore';
  import ProvideEmptyContext from '@/views/abilities/components/ProvideEmptyContext.vue';

  const props = defineProps<{commitId:string, aliasId:string}>()
  const aliases = ref<TargetAliasConfig>(await getTargetAliases(props.commitId))

  const node = ref<GamecoreTargetType>()
  watch(props, () => node.value = aliases.value.AliasDict[props.aliasId], { immediate: true })
</script>

<template>
  <main class="panel" :key="aliasId">
    <header>
      <h1><span class="pretitle">Target Alias:</span>{{ aliasId }}</h1>
    </header>
    <section>

      <template v-if="node">
        <ProvideEmptyContext :commitId="commitId">
          <AnyTask :node="node" />
        </ProvideEmptyContext>
      </template>
      <template v-else>
        <span class="minor">Not Found</span>
      </template>

    </section>
  </main>
</template>

<style scoped>
</style>