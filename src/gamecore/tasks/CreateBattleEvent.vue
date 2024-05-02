<script setup lang="ts">
  import { ref, inject, computed } from 'vue';
  import { getHash } from '@/common/translate';
  import useHashStore from '@/common/hashstore';
  import { GamecoreTask, GamecoreTargetType, DynamicExpression, } from '@/sources/gamecore';
  import { getBattleEvent } from '@/sources/battleevent';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import EvaluateExpression from '../EvaluateExpression.vue';
  import AnyTask from '../AnyTask.vue';

  const commitId = inject<string>('commitId') as string
  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    PropertyFromTarget?:GamecoreTargetType
    EventID:number|DynamicExpression
    DynamicValues?:
    {
      [key:string]:DynamicExpression
    }
    Team:string
    TotalDamageTeam:string
    OnBattleEventCreate:GamecoreTask[]
  }

  const battleEventId = computed(() => 
  {
    if (typeof(node.EventID) == 'number')
      return node.EventID

    if (!node.EventID.IsDynamic)
      return node.EventID.FixedValue?.Value
  })
  const battleEvent = ref(battleEventId.value ? await getBattleEvent(commitId, battleEventId.value) : undefined)

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
    <RouterLink v-if="battleEvent" :to="{ name:'battleEvent', params:{ commitId: commitId, objectId: battleEventId }}">
      <em :title="battleEventId?.toString()">{{ battleEvent.BattleEventName }}</em>
    </RouterLink>
    <em v-else-if="typeof(node.EventID) != 'number'">
      <EvaluateExpression :expression="node.EventID" />
    </em>

    for team <em>{{ node.Team }}</em>
    <template v-if="node.PropertyFromTarget">
      inheriting <em><EvaluateTargetType :target="node.PropertyFromTarget" /></em>'s properties
    </template>
    
    <template #content >
      <BlockLayout v-if="node.DynamicValues" v-for="expression, key in node.DynamicValues" :source="expression">
        With <em :title="getHash(key.toString()).toString()">{{ key }}</em> set to <em><EvaluateExpression :expression="expression" /></em>
      </BlockLayout>

      <template v-if="node.OnBattleEventCreate && node.OnBattleEventCreate.length > 0">
        <div class="subblock">
          <span class="flow">On BattleEvent Create</span>
          <template v-for="n in node.OnBattleEventCreate">
            <AnyTask :node="n" />
          </template>
        </div>
      </template>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>