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
    ModifierName:string
    RemoveAllInstance?:boolean
  }
  const createModifierRoute = inject<(key:string) => object>('createModifierRoute') as (key:string) => object
</script>

<template>
  <BlockLayout :source="node">

    Remove modifier
    <RouterLink v-if="node.ModifierName" :to="createModifierRoute(node.ModifierName)">
      <em>{{ node.ModifierName }}</em>
    </RouterLink>

    <template v-if="node.TargetType">
      from <em>{{ evaluateTargetType(node.TargetType) }}</em>
    </template>

    <template v-if="node.RemoveAllInstance">
      <span class="minor">(Remove all instances)</span>
    </template>
  </BlockLayout>
</template>

<style scoped>
</style>