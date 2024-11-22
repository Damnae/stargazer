<script setup lang="ts">
  import { GamecoreTask, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ValueList?:
    [
      {
        ValueName:string
        Property:string
      }
    ]
    Expression?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">

    ?Compare?
    <template v-for="v in node.ValueList">
      {{ v.ValueName }}/{{ v.Property }}
    </template>
    with 
    <em v-if="node.Expression">
      <EvaluateExpression :expression="node.Expression" />
    </em>

  </BlockLayout>
</template>

<style scoped>
</style>