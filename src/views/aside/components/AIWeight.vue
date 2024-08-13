<script setup lang="ts">
  import { ref, inject, } from 'vue';
  import { cleanupNumber } from '@/common/common';
  import { Character, CharacterSkillAIWeightGroup } from '@/sources/character';
  import { AIFactorGroup, getAIFactorGroup } from '@/sources/autofactorgroup';
  import AnyTask from '@/gamecore/AnyTask.vue';
  import FoldableLayout from '@/components/FoldableLayout.vue';

  const props = defineProps<{character:Character, weightGroup:CharacterSkillAIWeightGroup}>()
  const commitId = inject<string>('commitId') as string

  const aiFactorGroup = ref<AIFactorGroup>(props.character?.GlobalAIFactorGroups?.[props.weightGroup.GroupName] ?? await getAIFactorGroup(commitId, props.weightGroup.GroupName))
</script>

<template>
  <FoldableLayout>
    {{ weightGroup.GroupName }}
    <em>{{ cleanupNumber(weightGroup.Weight?.Value ?? 1) }}</em>&nbsp;<span class="minor">{{ aiFactorGroup ? aiFactorGroup.CombineOperator ?? "Add" : "Missing" }}</span>
    <template #content v-if="aiFactorGroup">
      <template v-for="factor in aiFactorGroup.Factors">
        <div class="minor">{{ factor.CombineOperator ?? "Add" }}</div>
        <AnyTask :node="factor.Source" />
        <AnyTask :node="factor.Mapper" />
        <AnyTask v-if="factor.PostProcess" :node="factor.PostProcess" />
      </template>
    </template>
  </FoldableLayout>
</template>