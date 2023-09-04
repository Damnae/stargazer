<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, evaluateTargetType, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
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
        at {{ evaluateTargetType(node.TargetType) }}
      </template>
    </span>
    <template #content>

      <div class="subblock">
        <template v-if="hasOnHit">
          <span class="flow">On Hit</span>
          <template v-for="n in node.OnProjectileHit">
            <AnyTask :node="n" />
          </template>
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