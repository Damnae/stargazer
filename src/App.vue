<script setup lang="ts">
import LoadingTitle from '@/views/LoadingTitle.vue';
import Footer from '@/views/Footer.vue'
</script>

<template>
  <div class="main-layout">
    <div class="main-content-layout">

      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Suspense :timeout="100">

            <component :is="Component"></component>
            <template #fallback>
              <LoadingTitle />
            </template>

          </Suspense>
        </template>
      </RouterView>

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
