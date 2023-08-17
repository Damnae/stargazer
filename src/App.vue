<script setup lang="ts">
import Title from './components/Title.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="main-layout">
    <div class="main-content-layout">
      <Title msg="Stargazer" />
    </div>
    <div class="main-footer-layout">
      <Footer>🤔</Footer>
    </div>
  </div>
</template>

<style scoped>
.main-layout
{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content-layout
{
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  min-width: 100vw;
}
.main-footer-layout
{
  display: flex;
  flex-direction: row;
  place-content: center;
  flex-shrink: 0;
  min-width: 100vw;
  background-color: #181818;
}
</style>
