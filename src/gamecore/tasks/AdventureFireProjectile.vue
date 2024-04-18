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
    OnProjectileLifetimeFinish?:GamecoreTask[]
    WaitProjectileFinish?:boolean
  }
  const hasOnHit = node.OnProjectileHit && node.OnProjectileHit.length > 0
  const hasOnExpire = node.OnProjectileLifetimeFinish && node.OnProjectileLifetimeFinish.length > 0
</script>

<template>
  <BlockLayout :source="node" :cosmetic="!(hasOnHit || hasOnExpire)">
    <span :class="hasOnHit || hasOnExpire ? 'flow' : ''">
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
      <div v-if="hasOnExpire" class="subblock">
        <span class="flow">On Expire</span>
        <template v-for="n in node.OnProjectileLifetimeFinish">
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