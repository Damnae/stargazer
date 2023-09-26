<script setup lang="ts">
  import { inject, } from 'vue';
  import { GamecoreTargetType, evaluateTargetType, } from '@/sources/gamecore';

  defineProps<{target?:GamecoreTargetType}>()
  const commitId = inject<string>('commitId') as string
</script>

<template>
  <template v-if="target?.$type == 'RPG.GameCore.TargetAlias'">
    <RouterLink :to="{ name:'targetAlias', params:{ commitId: commitId, aliasId: target.Alias }}">
      <em>{{ target.Alias }}</em>
    </RouterLink>
  </template>
  <template v-else>
    {{ evaluateTargetType(target) }}
  </template>
</template>

<style scoped>
</style>