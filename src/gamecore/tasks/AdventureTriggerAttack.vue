<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    AttackTargetType?:GamecoreTargetType
    AttackRootTargetType?:GamecoreTargetType
    EnterBattleSelectTargetType?:string
    OnAttack?:GamecoreTask[]
    OnBattle?:GamecoreTask[]
    OnKill?:GamecoreTask[]
  }
  const hasEvent = node.OnAttack && node.OnAttack.length > 0
      || node.OnBattle && node.OnBattle.length > 0
      || node.OnKill && node.OnKill.length > 0
</script>

<template>
  <BlockLayout :source="node">
    <span :class="hasEvent ? 'flow' : ''">
      Attack  
      <template v-if="node.AttackTargetType">
        <EvaluateTargetType :target="node.AttackTargetType" />
      </template>
      <template v-if="node.AttackRootTargetType">
        from <EvaluateTargetType :target="node.AttackRootTargetType" />
      </template>
      <template v-if="node.EnterBattleSelectTargetType">
        and enter battle with <em>{{ node.EnterBattleSelectTargetType }}</em>
      </template>
    </span>
    <template #content>

      <div v-if="node.OnAttack" class="subblock">
        <span class="flow">On Attack</span>
        <template v-for="n in node.OnAttack">
          <AnyTask :node="n" />
        </template>
      </div>

      <div v-if="node.OnBattle" class="subblock">
        <span class="flow">On Battle</span>
        <template v-for="n in node.OnBattle">
          <AnyTask :node="n" />
        </template>
      </div>

      <div v-if="node.OnKill" class="subblock">
        <span class="flow">On Kill</span>
        <template v-for="n in node.OnKill">
          <AnyTask :node="n" />
        </template>
      </div>

    </template>
  </BlockLayout>
</template>

<style scoped>
</style>