<script setup lang="ts">
  import { DynamicValue, GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Enable:boolean
    AllowSkillType:string[]
    TriggerName:string
    UITextNodes:
    [
      {
        TextPath:string
        TextDynamicValue:DynamicValue
      }
    ]
  }

</script>

<template>
  <BlockLayout :source="node" :cosmetic="true">
   
    {{ node.Enable ? 'Show' : 'Hide' }} special skill mark
    <template v-if="node.AllowSkillType">
      for <em>{{ node.AllowSkillType.join(', ') }}</em>
    </template>
    <template v-if="node.TriggerName">
      for trigger <em>{{ node.TriggerName }}</em>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>