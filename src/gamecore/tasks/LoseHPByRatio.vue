<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    RatioType:string
    Ratio:DynamicExpression
    Floor?:
    {
      Value:number
    }
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Have 
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>
    lose <em><EvaluateExpression :expression="node.Ratio" /></em>×
    HP by <em>{{ node.RatioType }}</em>
    
    <span v-if="node.Floor" class="minor">
      (No lower than {{ node.Floor.Value }})
    </span>

  </BlockLayout>
</template>

<style scoped>
</style>