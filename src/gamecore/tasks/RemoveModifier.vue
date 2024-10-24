<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import ModifierLink from '@/gamecore/ModifierLink.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ModifierName:string
    RemoveAllInstance?:boolean
  }
</script>

<template>
  <BlockLayout :source="node">

    Remove modifier
    <ModifierLink :modifierName="node.ModifierName" />

    <template v-if="node.TargetType">
      from <em><EvaluateTargetType :target="node.TargetType" /></em>
    </template>

    <template v-if="node.RemoveAllInstance">
      <span class="minor">(Remove all instances)</span>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>