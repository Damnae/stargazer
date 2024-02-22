<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    SourceType?:GamecoreTargetType
    TargetType?:GamecoreTargetType
    StatusTypeListFilter?:string[]
    BehaviorFlagFilter?:string[]
    InfectChance?:DynamicExpression
    StatusDispelFilter?:string
    InfectType?:string
    AutoRemoveFromSource?:boolean
  }
</script>

<template>
  <BlockLayout :source="node">
   
    Clone modifiers
    <template v-if="node.StatusTypeListFilter">
      with status type 
      <template v-if="node.StatusDispelFilter">
        <em>{{ node.StatusDispelFilter }}</em> /
      </template>
      <em>{{ node.StatusTypeListFilter.join(', ') }}</em>
    </template>
    <template v-if="node.BehaviorFlagFilter">
      with flag <em>{{ node.BehaviorFlagFilter.join(', ') }}</em>
    </template>
    <template v-if="node.SourceType">
      from <em><EvaluateTargetType :target="node.SourceType" /></em>
    </template>
    <template v-if="node.TargetType">
      to <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>
    <template v-if="node.InfectChance">
      with <em><EvaluateExpression :expression="node.InfectChance" /></em>× chance
    </template>
    <template v-if="node.AutoRemoveFromSource === true">
      and remove them from the source
    </template>
    <template v-if="node.InfectType">
      &nbsp;<span class="minor">({{ node.InfectType }})</span>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>