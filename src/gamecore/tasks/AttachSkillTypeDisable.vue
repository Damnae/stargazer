<script setup lang="ts">
  import { inject } from 'vue';
  import { cleanupMarkup } from '@/common/common';
  import translate, { Translatable } from '@/common/translate';
  import { GamecoreTargetType, GamecoreTask, 
  } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
import EvaluateTargetType from '../EvaluateTargetType.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    TargetType?:GamecoreTargetType
    Types?:string[]
    ControlSkillTypes?:string[]
    TextmapID?:Translatable
    Tip?:Translatable
  }

  const commitId = inject('commitId') as string
  translate(commitId, node.TextmapID)
  translate(commitId, node.Tip)
</script>

<template>
  <BlockLayout :source="node">
   
    Prevent 
    <template v-if="node.TargetType">
      <em><EvaluateTargetType :target="node.TargetType" /></em>'s
    </template>
    <template v-if="node.Types">
      use of <em>{{ node.Types.join(', ') }}</em>
    </template>
    <template v-if="node.ControlSkillTypes">
      use of <em>{{ node.ControlSkillTypes.join(', ') }}</em>
    </template>
    <template v-if="node.TextmapID?.Text">
      with hint "{{ cleanupMarkup(node.TextmapID?.Text) }}"
    </template>
    <template v-if="node.Tip?.Text">
      with tip "{{ cleanupMarkup(node.Tip?.Text) }}"
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>