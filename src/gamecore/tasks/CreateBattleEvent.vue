<script setup lang="ts">
  import { getHash } from '@/common/translate';
  import { GamecoreTask, 
    GamecoreTargetType,
    DynamicExpression,
evaluateTargetType, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import useHashStore from '@/common/hashstore';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    PropertyFromTarget?:GamecoreTargetType
    EventID:number
    DynamicValues?:
    {
      [key:string]:DynamicExpression
    }
    Team:string
    TotalDamageTeam:string
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

    Create battle event <em>{{ node.EventID }}</em>
    for team <em>{{ node.Team }}</em>
    <template v-if="node.PropertyFromTarget">
      inheriting <em>{{ evaluateTargetType(node.PropertyFromTarget) }}</em>'s properties
    </template>
    
    <template #content >
      <BlockLayout v-if="node.DynamicValues" v-for="expression, key in node.DynamicValues" :source="expression">
        With <em :title="getHash(key.toString()).toString()">{{ key }}</em> set to <em><EvaluateExpression :expression="expression" /></em>
      </BlockLayout>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>