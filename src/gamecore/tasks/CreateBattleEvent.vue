<script setup lang="ts">
  import { ref, inject } from 'vue';
  import { getHash } from '@/common/translate';
  import useHashStore from '@/common/hashstore';
  import { GamecoreTask, 
    GamecoreTargetType, evaluateTargetType, 
    DynamicExpression,
  } from '@/sources/gamecore';
  import { BattleEvent, getBattleEvent } from '@/sources/battleevent';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';

  const commitId = inject<string>('commitId') as string
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

  const battleEvent = ref<BattleEvent>(await getBattleEvent(commitId, node.EventID))

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

    Create battle event 
    <RouterLink :to="{ name:'battleEvent', params:{ commitId: commitId, objectId: node.EventID }}">
      <em :title="node.EventID.toString()">{{ battleEvent.BattleEventName }}</em>
    </RouterLink>

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