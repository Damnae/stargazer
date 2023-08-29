<script setup lang="ts">
  import { onErrorCaptured, provide, ref } from 'vue'
  import Loading from '@/views/Loading.vue';
  import CommitNav from '@/views/navigation/CommitNav.vue'

  const props = defineProps<{commitId:string}>()
  provide<string>('commitId', props.commitId)

  const errorMessage = ref('')
  onErrorCaptured((error, _instance, info) => 
  {
    errorMessage.value = `❌ Error in ${info}, ${error}`
  })
</script>

<template>
  <div class="commit-layout">
    <CommitNav>
      <RouterView name="subnav" />
    </CommitNav>

    <RouterView v-if="!errorMessage" v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>

          <component :is="Component"></component>
          <template #fallback>
            <Loading />
          </template>

        </Suspense>
      </template>
    </RouterView>
    <Loading v-else :message="errorMessage" />

  </div>
</template>

<style scoped>
  .commit-layout
  {
    display: flex;
    flex-direction: row;
    justify-content: left;
    width: 100%;
    gap:.5rem;
    padding:0 .5em;
  }
</style>
