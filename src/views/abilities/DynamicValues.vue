<script setup lang="ts">
  import { Ref, inject } from 'vue';
  import { GamecoreContext, 
    DynamicValues, explainDynamicValueFromContext, } from '@/scripts/sources/gamecore';
  import useHashStore from '@/scripts/hashstore';
  import BlockLayout from '../gamecore/BlockLayout.vue';

  defineProps<{dynamicValues?:DynamicValues}>()
  const gamecoreContext = inject('gamecoreContext') as Ref<GamecoreContext>
  const hashStore = useHashStore()
</script>

<template>
  <BlockLayout v-if="dynamicValues" :source="dynamicValues">
    <span class="flow">Dynamic Values</span>
    <template #content>
      <BlockLayout v-for="value, key in dynamicValues.Values" :source="value" :title="key">
        {{ hashStore.translate(key as number) ?? key }}
        <template v-if="value.ReadInfo">
          = <em>{{ explainDynamicValueFromContext(value, gamecoreContext) }}</em>
        </template>
      </BlockLayout>
    </template>
  </BlockLayout>
</template>