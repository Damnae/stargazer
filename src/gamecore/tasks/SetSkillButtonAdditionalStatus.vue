<script setup lang="ts">
  import { GamecoreTask,
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
import { cleanupFilename } from '@/common/common';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    ControlSkillType?:string
    PrefabPath?:string
    Type?:number
    IsActive?:boolean
    AnimStateName?:string
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
  <BlockLayout :source="node" :cosmetic="true">
    
    Change
    <em>{{ getControlName(node.ControlSkillType) }}</em> button effect
    <template v-if="node.PrefabPath">
      to <em>{{ cleanupFilename(node.PrefabPath) }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>