<script setup lang="ts">
  import { RangeWatcher, } from '@/sources/ability';
  import EvaluateExpression from '@/gamecore/EvaluateExpression.vue';
  import BlockLayout from '@/components/BlockLayout.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  defineProps<{range:RangeWatcher}>()
</script>

<template>
  <BlockLayout :source="range">
    <span class="flow">
      Range <em><EvaluateExpression :expression="range.Min" /></em>
      to <em><EvaluateExpression :expression="range.Max" /></em>
      <span class="minor">
        <template v-if="range.MaxInclusive">(Inclusive)</template>
        <template v-else>(Exclusive)</template>
      </span>
    </span>
    <template #content>
      <BlockLayout v-if="range.OnEnterRange" :source="range.OnEnterRange">
        <span class="flow">On Enter Range</span>
        <template #content>
          <AnyTask v-for="n in range.OnEnterRange" :node="n" />
        </template>
      </BlockLayout>
      <BlockLayout v-if="range.OnExitRange" :source="range.OnExitRange">
        <span class="flow">On Exit Range</span>
        <template #content>
          <AnyTask v-for="n in range.OnExitRange" :node="n" />
        </template>
      </BlockLayout>
      <BlockLayout v-if="range.OnChange" :source="range.OnChange">
        <span class="flow">On Change</span>
        <template #content>
          <AnyTask v-for="n in range.OnChange" :node="n" />
        </template>
      </BlockLayout>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>