<script setup lang="ts">
  import { GamecoreTask, 
    DynamicExpression, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    SummonMonsterDataList:
    [
      {
        MonsterID:DynamicExpression
        MonsterIDFromCustomValue:
        {
          Hash:number
        }
        LocationType:string
        InitAnimStateName:string
      }
    ]
    DelayRatio?:DynamicExpression
  }
</script>

<template>
  <BlockLayout :source="node">
    Summon monsters 
    <template v-if="node.DelayRatio">
      with delay <em><EvaluateExpression :expression="node.DelayRatio" /></em>
    </template>
    <template #content>
      <div class="subblock">
        <div v-for="monster in node.SummonMonsterDataList">
          Place monster 
          <template v-if="monster.MonsterIDFromCustomValue?.Hash">
            <em>{{ monster.MonsterIDFromCustomValue.Hash }}</em>
          </template>
          <template v-else>
            <em><EvaluateExpression :expression="monster.MonsterID" /></em>
          </template>
          at <em>{{ monster.LocationType }}</em>
        </div>
      </div>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>