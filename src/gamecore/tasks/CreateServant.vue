<script setup lang="ts">
  import { getHash } from '@/common/translate';
  import useHashStore from '@/common/hashstore';
  import { GamecoreTask, DynamicExpression, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import AnyTask from '../AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ServantID?:DynamicExpression
    DynamicValues?:
    {
      [key:string]:DynamicExpression
    }
    OnServantCreate?:GamecoreTask[]
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

    Create servant 
    <template v-if="node.ServantID">
      <em><EvaluateExpression :expression="node.ServantID" /></em>
    </template>

    <template #content>
      <BlockLayout v-if="node.DynamicValues" v-for="expression, key in node.DynamicValues" :source="expression">
        With <em :title="getHash(key.toString()).toString()">{{ key }}</em> set to <em><EvaluateExpression :expression="expression" /></em>
      </BlockLayout>

      <div class="subblock">
        <template v-if="node.OnServantCreate">
          <span class="flow">On Create</span>
          <AnyTask v-for="n in node.OnServantCreate" :node="n" />
        </template>
      </div>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>