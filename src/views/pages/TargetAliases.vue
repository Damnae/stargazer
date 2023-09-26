<script setup lang="ts">
  import { ref, } from 'vue';
  import { TargetAliasConfig, getTargetAliases } from '@/sources/targetalias';
  import AnyTask from '@/gamecore/AnyTask.vue';
  import ProvideEmptyContext from '@/views/abilities/components/ProvideEmptyContext.vue';

  const props = defineProps<{commitId:string}>()
  const aliases = ref<TargetAliasConfig>(await getTargetAliases(props.commitId))
</script>

<template>
  <main class="panel">
    <header>
      <h1>Target Aliases</h1>
    </header>
    <section>

      <ProvideEmptyContext :commitId="commitId">
        <div v-for="alias, name in aliases.AliasDict">
          <h2>{{ name }}</h2>
          <AnyTask :node="alias" />
        </div>
      </ProvideEmptyContext>

    </section>
  </main>
</template>

<style scoped>
</style>