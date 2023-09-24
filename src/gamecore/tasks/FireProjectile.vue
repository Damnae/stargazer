<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    OnProjectileHit?:GamecoreTask[]
    WaitProjectileFinish?:boolean
  }
  const hasOnHit = node.OnProjectileHit && node.OnProjectileHit.length > 0
</script>

<template>
  <BlockLayout :source="node" :cosmetic="!hasOnHit">
    <span :class="hasOnHit ? 'flow' : ''">
      Fire projectile 
      <template v-if="node.TargetType">
        at <EvaluateTargetType :target="node.TargetType" />
      </template>
    </span>
    <template #content>

      <div v-if="hasOnHit" class="subblock">
        <span class="flow">On Hit</span>
        <template v-for="n in node.OnProjectileHit">
          <AnyTask :node="n" />
        </template>
      </div>

      <BlockLayout v-if="node.WaitProjectileFinish" :cosmetic="true">
        Wait for the projectile to finish
      </BlockLayout>

    </template>
  </BlockLayout>
</template>

<style scoped>
</style>