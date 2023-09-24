<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    CasterTargetType?:GamecoreTargetType
    TargetType?:GamecoreTargetType
    Count:number
    OnProjectileHitClientOnly?:GamecoreTask[]
    PerProjectileDamage?:GamecoreTask
    WaitProjectileFinish?:boolean
  }
  const hasOnHit = !!node.PerProjectileDamage || node.OnProjectileHitClientOnly && node.OnProjectileHitClientOnly.length > 0
</script>

<template>
  <BlockLayout :source="node" :cosmetic="!hasOnHit">
    <span :class="hasOnHit ? 'flow' : ''">
      Fire <em>{{ node.Count }}</em>-hit wave projectile 
      <template v-if="node.CasterTargetType">
        from <em><EvaluateTargetType :target="node.CasterTargetType" /></em>
      </template>
      <template v-if="node.TargetType">
        to <em><EvaluateTargetType :target="node.TargetType" /></em>
      </template>
    </span>
    <template #content>

      <div v-if="hasOnHit" class="subblock">
        <span class="flow">On Hit</span>
        <AnyTask v-if="node.PerProjectileDamage" :node="node.PerProjectileDamage" withComponentName="DamageByAttackProperty"/>
        <AnyTask v-if="node.OnProjectileHitClientOnly" v-for="n in node.OnProjectileHitClientOnly" :node="n" />
      </div>

      <BlockLayout v-if="node.WaitProjectileFinish" :cosmetic="true">
        Wait for the projectile to finish
      </BlockLayout>

    </template>
  </BlockLayout>
</template>

<style scoped>
</style>