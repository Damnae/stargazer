<script setup lang="ts">
  import { ref, inject, } from 'vue';
  import { cleanupNumber } from '@/common/common';
  import { CharacterSkillAIWeightGroup } from '@/sources/character';
  import { AIFactorGroup, getAIFactorGroup } from '@/sources/autofactorgroup';
import AnyTask from '@/gamecore/AnyTask.vue';

  const props = defineProps<{weightGroup:CharacterSkillAIWeightGroup}>()
  const commitId = inject<string>('commitId') as string

  const aiFactorGroup = ref<AIFactorGroup>(await getAIFactorGroup(commitId, props.weightGroup.GroupName))
</script>

<template>
  {{ weightGroup.GroupName }} 
  {{ cleanupNumber(weightGroup.Weight?.Value ?? 1) }}

  <!-- <div class="minor">{{ aiFactorGroup.CombineOperator ?? "Add" }}</div> -->
  <template v-for="factor in aiFactorGroup.Factors">
    <div class="minor">{{ factor.CombineOperator ?? "Add" }}</div>
    <AnyTask :node="factor.Source" />
    <AnyTask :node="factor.Mapper" />
  </template>
</template>