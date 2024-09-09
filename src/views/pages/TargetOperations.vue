<script setup lang="ts">
  import { ref, } from 'vue';
  import { TargetOperationConfig, getTargetOperations } from '@/sources/targetoperation';
  import AnyTask from '@/gamecore/AnyTask.vue';
  import ProvideEmptyContext from '@/views/abilities/components/ProvideEmptyContext.vue';

  const props = defineProps<{commitId:string}>()
  const operations = ref<TargetOperationConfig>(await getTargetOperations(props.commitId))
</script>

<template>
  <main class="panel">
    <header>
      <h1>Target Operations</h1>
    </header>
    <section>

      <ProvideEmptyContext :commitId="commitId">
        <div v-for="operation, name in operations.OperationDict">
          <h2>{{ name }}</h2>
          <AnyTask :node="operation" />
        </div>
      </ProvideEmptyContext>

    </section>
  </main>
</template>

<style scoped>
</style>