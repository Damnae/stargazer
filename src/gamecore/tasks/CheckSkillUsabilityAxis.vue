<script setup lang="ts">
  import { cleanupNumber } from '@/common/common';
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    SkillName:string
    InitialCD:number
    CD:number
    CheckScore?:
    {
      Value:number
    }
  }
</script>

<template>
  <BlockLayout :source="node">

    <span class="flow">
      Skill usability axis 
      <template v-if="node.CheckScore">
        with Score <em>{{ cleanupNumber(node.CheckScore.Value) }}</em>
      </template>
    </span>

    <template #content>
      <div class="subblock">
        Cooldown: <em>{{ node.CD }}</em>,
        Initial: <em>{{ node.InitialCD }}</em>
      </div>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>