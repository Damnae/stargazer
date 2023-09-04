<script setup lang="ts">
  import { getHash } from '@/common/translate';
  import { GamecoreTask, 
    DynamicExpression, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    [key:string]:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">

    <span class="flow">Modify damage data</span>

    <template #content>
      <template v-for="expression, key in node">
        <BlockLayout v-if="key != '$type'" :source="expression">
          Change <em :title="getHash(key.toString()).toString()">{{ key }}</em> to <em><EvaluateExpression :expression="expression" /></em>
        </BlockLayout>
      </template>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>