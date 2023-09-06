<script setup lang="ts">
  import { ref, onErrorCaptured, } from 'vue';
  import LoadingTitle from '@/components/LoadingTitle.vue';
  import Footer from '@/views/Footer.vue'

  const errorMessage = ref('')
  onErrorCaptured((error, _instance, info) => 
  {
    errorMessage.value = `❌ Error in ${info}, ${error}`
  })
</script>

<template>
  <div class="main-layout">
    <div class="main-content-layout">

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

    </div>
    <div class="main-footer-layout">
      <Footer>🌠</Footer>
    </div>
  </div>
</template>

<style scoped>
.main-layout
{
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main-content-layout
{
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
  overflow:auto;
}
.main-footer-layout
{
  flex-shrink: 0;
  width: 100%;
  background-color: #181818;
}
</style>
