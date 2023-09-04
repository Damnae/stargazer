<script setup lang="ts">
  import { inject } from 'vue';
  import { getHash } from '@/common/translate';
  import { GamecoreTask, 
    GamecoreTargetType, evaluateTargetType, 
    DynamicExpression, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import useHashStore from '@/common/hashstore';
  import AnyTask from '../AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ModifierName:string
    Chance?:DynamicExpression
    LayerAddWhenStack?:DynamicExpression
    MaxLayer?:DynamicExpression
    LifeTime?:DynamicExpression
    LifeStepImmediately?:boolean
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

  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">

    Apply 
    <template v-if="node.LayerAddWhenStack">
      <em><EvaluateExpression :expression="node.LayerAddWhenStack" /></em> stacks of
    </template>
    modifier
    <RouterLink v-if="node.ModifierName" :to="createModifierRoute(node.ModifierName)">
      <em>{{ node.ModifierName }}</em>
    </RouterLink>

    <template v-if="node.TargetType">
      to <em>{{ evaluateTargetType(node.TargetType) }}</em>
    </template>
    <template v-if="node.Chance">
      with <em><EvaluateExpression :expression="node.Chance" /></em>× base chance
    </template>
    <template v-if="node.MaxLayer">
      with up to <em><EvaluateExpression :expression="node.MaxLayer" /></em> stacks
    </template>
    <template v-if="node.LifeTime">
      for <em><EvaluateExpression :expression="node.LifeTime" /></em> turns
      <template v-if="!node.LifeStepImmediately">
      </template>
    </template>
    <template v-if="node.LifeStepImmediately">
      <span class="minor">(Tick immediately)</span>
    </template>

    <template #content >
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