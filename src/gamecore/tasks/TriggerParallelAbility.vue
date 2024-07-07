<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ParallelAbilityList:
    [
      {
        TargetType:GamecoreTargetType
        AbilityInherentTargetType:GamecoreTargetType
        AbortBehaviorFlags?:string[]
        AbilityName?:string
        AbilityTag?:string
        Delay?: 
        {
          Value:number
        }
      }
    ]
  }

</script>

<template>
  <BlockLayout :source="node">
    <span class="flow">Run in parallel</span>
    <template #content>
      <BlockLayout v-for="n in node.ParallelAbilityList" :source="n">
        <template v-if="n.AbilityName">
          Have <em><EvaluateTargetType :target="n.TargetType" /></em> 
          use ability <em>{{ n.AbilityName }}</em> 
        </template>
        <template v-else>
          <em><EvaluateTargetType :target="n.TargetType" /></em> 
        </template>

        <template v-if="n.AbilityTag">
          with tag <em>{{ n.AbilityTag }}</em> 
        </template>
        <template v-if="n.AbortBehaviorFlags">
          abort on <em>{{ n.AbortBehaviorFlags.join(', ') }}</em> 
        </template>
        on <em><EvaluateTargetType :target="n.AbilityInherentTargetType" /></em>
      </BlockLayout>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>