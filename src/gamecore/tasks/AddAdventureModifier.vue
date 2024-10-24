<script setup lang="ts">
  import { getHash } from '@/common/translate';
  import useHashStore from '@/common/hashstore';
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import AnyTask from '../AnyTask.vue';
  import ModifierLink from '@/gamecore/ModifierLink.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ModifierName:string
    StackingFlag?:string
    Chance?:DynamicExpression
    Count?:DynamicExpression
    LayerAddWhenStack?:DynamicExpression
    MaxLayer?:DynamicExpression
    LifeTime?:DynamicExpression
    LifeStepImmediately?:boolean
    InheritCaster?:string
    DynamicValues?:
    {
      [key:string]:DynamicExpression
    }
    SuccessTaskList?:GamecoreTask[]
    FailTaskList?:GamecoreTask[]
    ResistedTaskList?:GamecoreTask[]
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
    <template v-if="node.LayerAddWhenStack">
      <em><EvaluateExpression :expression="node.LayerAddWhenStack" /></em> stacks of
    </template>
    <template v-else-if="node.Count">
      <em><EvaluateExpression :expression="node.Count" /></em> stacks of
    </template>
    modifier
    <ModifierLink :modifierName="node.ModifierName" />

    <template v-if="node.InheritCaster">
      with <em>{{ node.InheritCaster }}</em> as the caster
    </template>

    <template v-if="node.TargetType">
      to <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>
    <template v-if="node.Chance">
      with <em><EvaluateExpression :expression="node.Chance" /></em>× base chance
    </template>
    <template v-if="node.MaxLayer">
      with up to <em><EvaluateExpression :expression="node.MaxLayer" /></em> stacks
    </template>
    <template v-if="node.LifeTime">
      for <em><EvaluateExpression :expression="node.LifeTime" /></em> turns
    </template>
    <template v-if="node.StackingFlag">
      stacking by <em>{{ node.StackingFlag }}</em>
    </template>
    <template v-if="node.LifeStepImmediately">
      &nbsp;<span class="minor">(Tick immediately)</span>
    </template>

    <template #content>
      <BlockLayout v-if="node.DynamicValues" v-for="expression, key in node.DynamicValues" :source="expression">
        With <em :title="getHash(key.toString()).toString()">{{ key }}</em> set to <em><EvaluateExpression :expression="expression" /></em>
      </BlockLayout>

      <div class="subblock">
        <template v-if="node.SuccessTaskList">
          <span class="flow">On Success</span>
          <AnyTask v-for="n in node.SuccessTaskList" :node="n" />
        </template>
        <template v-if="node.FailTaskList">
          <span class="flow">On Failure</span>
          <AnyTask v-for="n in node.FailTaskList" :node="n" />
        </template>
        <template v-if="node.ResistedTaskList">
          <span class="flow">On Resist</span>
          <AnyTask v-for="n in node.ResistedTaskList" :node="n" />
        </template>
      </div>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>