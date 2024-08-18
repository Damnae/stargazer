<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    RemainInTeam?:boolean
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Remove <em><EvaluateTargetType :target="node.TargetType" /></em> from its team formation
    <template v-if="node.RemainInTeam">
        <span class="minor">(Remain in team)</span>
    </template>
    <template v-else>
      <span class="minor">(Remove from team)</span>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>