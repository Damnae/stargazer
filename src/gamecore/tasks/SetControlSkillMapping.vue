<script setup lang="ts">
  import { GamecoreTask, GamecoreTargetType, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    ControlSkillType?:string
    SkillTriggerKey?:string
  }

  function getControlName(control?:string)
  {
    switch (control)
    {
      case undefined:
      case 'ControlSkill01':
        return 'Basic ATK'
      case 'ControlSkill02':
        return 'Skill'
      case 'ControlSkill03':
        return 'Ultimate'
      default:
        return control
    }
  }
</script>

<template>
  <BlockLayout :source="node">
    
    Change
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s
    </template>
    <em>{{ getControlName(node.ControlSkillType) }}</em>
    <template v-if="node.SkillTriggerKey">
      to <em>{{ node.SkillTriggerKey }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>