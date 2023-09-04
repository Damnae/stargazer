<script setup lang="ts">
  import { Ref, inject } from 'vue';
  import { ExpressionContext, 
    DynamicValues, explainDynamicValueFromContext, } from '@/sources/gamecore';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';

  defineProps<{dynamicValues?:DynamicValues}>()
  const expressionContext = inject('expressionContext') as Ref<ExpressionContext>
  const hashStore = useHashStore()
</script>

<template>
  <BlockLayout v-if="dynamicValues" :source="dynamicValues">
    <span class="flow">Dynamic Values</span>
    <template #content>
      <BlockLayout v-for="value, key in dynamicValues.Values" :source="value" :title="key">
        {{ hashStore.translate(key as number) ?? key }}
        <template v-if="value.ReadInfo">
          = <em>{{ explainDynamicValueFromContext(value, expressionContext) }}</em>
        </template>
      </BlockLayout>
    </template>
  </BlockLayout>
</template>