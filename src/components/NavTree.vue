<script setup lang="ts">
  import { Ref, inject, ref, computed, useSlots, provide, } from 'vue';
  import LoadingNav from '@/components/LoadingNav.vue';

  const slots = useSlots()
  const props = defineProps<{startsOpen?:boolean, forceOpen?:boolean}>()

  const forceNavigationOpen = inject<Ref<boolean>>('forceNavigationOpen', computed(() => props.forceOpen ?? false))
  provide('forceNavigationOpen', forceNavigationOpen)

  const open = ref(props?.startsOpen ?? false)
  const isOpen = computed(() => forceNavigationOpen.value || open.value || !slots.header)

  function toggleOpen()
  {
    if (forceNavigationOpen.value)
      return

    open.value = !open.value
  }
</script>

<template>
  <div v-if="$slots.header" @click="toggleOpen()" :class="['navtree-header', isOpen ? 'navtree-open' : 'navtree-closed', forceNavigationOpen ? 'navtree-forcedopen' : '']">
    <slot name="header" />
  </div>
  <ul v-if="$slots.default && isOpen" class="navtree">
    <Suspense>
      <slot />
      <template #fallback>
        <LoadingNav />
      </template>
    </Suspense>
  </ul>
  <div v-if="$slots.footer && isOpen" class="navfooter">
    <slot name="footer" />
  </div>
</template>

<style scoped>
</style>