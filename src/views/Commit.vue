<script setup lang="ts">
  import { onErrorCaptured, provide, ref } from 'vue'
  import LoadingTitle from '@/components/LoadingTitle.vue';
  import CommitNav from '@/views/navigation-main/CommitNav.vue'
  import CommitAside from '@/views/aside/CommitAside.vue';

  const props = defineProps<{commitId:string}>()
  provide<string>('commitId', props.commitId)

  const errorMessage = ref('')
  onErrorCaptured((error, _instance, info) => 
  {
    errorMessage.value = `❌ Error in ${info}, ${error}`
  })
</script>

<template>
  <div class="commit-layout" :key="commitId">
    
    <CommitNav>
      <RouterView name="subnav" v-slot="{ Component }">
        <Transition name="fade">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </CommitNav>

    <RouterView v-if="!errorMessage" v-slot="{ Component }">
      <template v-if="Component">
        <Suspense :timeout="100">

          <component :is="Component"></component>
          <template #fallback>
            <LoadingTitle />
          </template>

        </Suspense>
      </template>
    </RouterView>
    <LoadingTitle v-else :message="errorMessage" />

    <CommitAside />

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
