<script setup lang="ts">
  import { getHash } from '@/common/translate';
  import useHashStore from '@/common/hashstore';
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ID:number
    Level?:DynamicExpression
    Count?:DynamicExpression
    LifeTime?:DynamicExpression
    DynamicValues?:
    {
      [key:string]:DynamicExpression
    }
  }
  
  if (node.DynamicValues)
  {
    const hashStore = useHashStore()
    for (const key of Object.keys(node.DynamicValues))
      hashStore.register(key, false)
    hashStore.commit()
  }
</script>

<template>
  <BlockLayout :source="node">

    Apply 
    <template v-if="node.Count">
      <em><EvaluateExpression :expression="node.Count" /></em> stacks of
    </template>
    <template v-if="node.Level">
      level <em><EvaluateExpression :expression="node.Level" /></em>
    </template>
    buff <em>{{ node.ID }}</em>

    <template v-if="node.TargetType">
      to <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>
    <template v-if="node.LifeTime">
      for <em><EvaluateExpression :expression="node.LifeTime" /></em> seconds
    </template>

    <template #content>
      <BlockLayout v-if="node.DynamicValues" v-for="expression, key in node.DynamicValues" :source="expression">
        With <em :title="getHash(key.toString()).toString()">{{ key }}</em> set to <em><EvaluateExpression :expression="expression" /></em>
      </BlockLayout>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>