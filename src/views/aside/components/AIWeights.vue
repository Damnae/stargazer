<script setup lang="ts">
  import { cleanupNumber } from '@/common/common';
  import { Character, CharacterSkillAIWeightData } from '@/sources/character';
  import AIWeight from './AIWeight.vue';

  defineProps<{character:Character, weightData:CharacterSkillAIWeightData}>()
</script>

<template>
  <ul>
    <li v-for="weightGroup in weightData?.Groups">
      <AIWeight :weightGroup="weightGroup" :character="character" />
    </li>
  </ul>
  <div class="minor" v-if="weightData?.SkillBasicPower">
    Power: {{ cleanupNumber(weightData?.SkillBasicPower.Value) }}
  </div>
</template>