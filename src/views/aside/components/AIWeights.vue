<script setup lang="ts">
  import { cleanupNumber } from '@/common/common';
  import { CharacterSkillAIWeightData } from '@/sources/character';
  import AIWeight from './AIWeight.vue';

  defineProps<{weightData:CharacterSkillAIWeightData}>()
</script>

<template>
  <ul>
    <li v-for="weightGroup in weightData?.Groups">
      <AIWeight :weightGroup="weightGroup" />
    </li>
  </ul>
  <div class="minor" v-if="weightData?.SkillBasicPower">
    Power: {{ cleanupNumber(weightData?.SkillBasicPower.Value) }}
  </div>
</template>