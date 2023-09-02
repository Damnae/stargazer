<script setup lang="ts">
  import { inject } from 'vue';
  import { GamecoreNode, 
    GamecoreTargetType, evaluateTargetType, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    PrepareAbilityName?:string
    Priority?:number
    SkillType?:string
    PlayReadyCamera?:boolean
    CanInsertUltraSkill?:boolean
    SkillTypeWhenDelayed?:string
  }

  const createAbilityRoute = inject<(key:string) => object>('createAbilityRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">
   
    Insert extra turn action
    <RouterLink v-if="node.PrepareAbilityName" :to="createAbilityRoute(node.PrepareAbilityName)">
      with ability <em>{{ node.PrepareAbilityName }}</em>
    </RouterLink>
    <template v-if="node.TargetType">
      for <em>{{ evaluateTargetType(node.TargetType) }}</em>'s 
    </template>
    <template v-if="!node.CanInsertUltraSkill">
      <span class="minor">(Prevent ultimate use)</span>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>