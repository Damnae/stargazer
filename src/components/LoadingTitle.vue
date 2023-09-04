<script setup lang="ts">
  defineProps<{message?:string}>()
</script>

<template>
  <section class="maintitle">
    <h1>Stargazer</h1>
    <span class="loader"></span>
    <p v-if="message">{{ message }}</p>
    <p v-else class="minor">It's loading. -- Source: Just trust me bro.</p>
  </section>
</template>

<style scoped>
.maintitle 
{
  width:20em;
  text-align:center;
}
.loader 
{
  width: 100%;
  height: 4.8px;
  display: inline-block;
  position: relative;
  background: rgba(255, 255, 255, 0.15);
  overflow: hidden;
}
.loader::after 
{
  content: '';
  width: 192px;
  height: 4.8px;
  background: #FFF;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  animation: animloader 1s linear infinite;
}

@keyframes animloader 
{
  0% 
  {
    left: 0;
    transform: translateX(-100%);
  }
  100% 
  {
    left: 100%;
    transform: translateX(0%);
  }
}
</style>
