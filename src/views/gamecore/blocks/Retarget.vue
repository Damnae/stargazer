<script setup lang="ts">
  import { GamecoreNode, 
    GamecoreTargetType, 
    DynamicExpression, evaluateDynamicExpression, evaluateTargetType, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import AnyBlock from '@/views/gamecore/AnyBlock.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType:GamecoreTargetType
    MaxNumber?:DynamicExpression
    Predicate?:GamecoreNode
    IncludeLimbo:boolean
    TaskList?:GamecoreNode[]
  }

  const tasks = node.TaskList;
</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">
      Retarget
      <template v-if="node.MaxNumber">
        up to {{ evaluateDynamicExpression(node.MaxNumber) }} in 
      </template>
      <template v-else>
        all in 
      </template>
      {{ evaluateTargetType(node.TargetType) }}
      <span class="minor">
        <template v-if="node.IncludeLimbo">
          (Including Limbo) 
        </template>
        <template v-else>
          (Excluding Limbo) 
        </template>
      </span>
    </span>
    <template #content>
      <div class="subblock">
        <template v-if="node.Predicate">
          <span class="flow">With Condition</span>
          <AnyBlock :node="node.Predicate" />
        </template>
        <template v-if="tasks && tasks.length > 0">
          <span class="flow">Do</span>
          <template v-for="n in tasks">
            <AnyBlock :node="n" />
          </template>
        </template>
      </div>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>