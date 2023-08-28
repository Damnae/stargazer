<script setup lang="ts">
import Footer from './views/Footer.vue'
</script>

<template>
  <div class="main-layout">
    <div class="main-content-layout">
      <Suspense>
        <RouterView />
        <template #fallback>
          Loading...
        </template>
      </Suspense>
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
