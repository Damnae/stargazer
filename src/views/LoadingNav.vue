<script setup lang="ts">
</script>

<template>
  <span class="loader"></span>
</template>

<style scoped>
.loader 
{
  height: 24px;
  display: block;
  margin: auto 1em auto auto;
  position: relative;
  box-sizing: border-box;
}
.loader::after 
{
  content: 'Loading...';
  color:grey;
  padding:0 .5em;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(90deg, transparent, #242424 50%, transparent 100%),
    linear-gradient(#181818 24px, transparent 0);
  background-repeat: no-repeat;
  background-size: 100px 100%, 100% 100%;
  background-position: -40% 0, center 0;
  box-sizing: border-box;
  border-radius: .25em;
  animation: animloader 1s linear infinite;
}
@keyframes animloader 
{
  to 
  {
    background-position: 140% 0, center 0;
  }
}
</style>
