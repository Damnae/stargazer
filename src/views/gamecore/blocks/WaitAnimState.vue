<script setup lang="ts">
  import { inject, Ref, } from 'vue';
  import { GamecoreNode, GamecoreContext, 
    GamecoreTargetType, evaluateTargetType, 
    DynamicExpression, evaluateDynamicExpression, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    AnimStateName?:string
    NormalizedTimeEnd?:DynamicExpression
  }
  const gamecoreContext = inject('gamecoreContext') as Ref<GamecoreContext>
</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    Wait for 
    
    <template v-if="node.TargetType">
      <em>{{ evaluateTargetType(node.TargetType) }}</em>'s 
    </template>

    <template v-if="node.AnimStateName">
      <em>{{ node.AnimStateName }}</em>'s 
    </template>

    animation to 

    <template v-if="node.AnimStateName">
      reach <em>{{ evaluateDynamicExpression(node.NormalizedTimeEnd, gamecoreContext) }}</em>%
    </template>
    <template v-else>
      <!-- see Avatar_Himeko_Skill02_Phase02 -->
      start(?)
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>