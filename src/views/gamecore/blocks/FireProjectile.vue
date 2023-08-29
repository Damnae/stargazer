<script setup lang="ts">
  import { GamecoreNode, GamecoreTargetType, evaluateTargetType, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';
  import AnyBlock from '@/views/gamecore/AnyBlock.vue';

  const props = defineProps<{node:GamecoreNode}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    OnProjectileHit?:GamecoreNode[]
    WaitProjectileFinish?:boolean
  }
  const hasOnHit = node.OnProjectileHit && node.OnProjectileHit.length > 0
</script>

<template>
  <BlockLayout :source="node" :cosmetic="!hasOnHit">
    <span class="flow">
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
            <AnyBlock :node="n" />
          </template>
        </template>
      </div>

    </template>
  </BlockLayout>
  <BlockLayout v-if="node.WaitProjectileFinish" :cosmetic="true">
    Wait for the projectile to finish
  </BlockLayout>
</template>

<style scoped>
</style>