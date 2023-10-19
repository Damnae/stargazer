<script setup lang="ts">
  import { ref, computed, watch, inject, } from 'vue';
  import { useRoute } from 'vue-router';
  import useHashStore from '@/common/hashstore';
  import { Avatar, getAvatar } from '@/sources/avatar';
  import { Character, getCharacterByAvatar } from '@/sources/character';

  import LoadingNav from '@/components/LoadingNav.vue';
import { cleanupNumber } from '@/common/common';

  const commitId = inject<string>('commitId') as string
  
  const route = useRoute()
  const objectId = computed(() => Number.parseInt(route.params.objectId as string, 10))

  const avatar = ref<Avatar>()
  const character = ref<Character>()

  const loading = ref(true)
  watch(objectId, async () => 
  {
    loading.value = true
    avatar.value = await getAvatar(commitId, objectId.value)
    character.value = avatar.value ? await getCharacterByAvatar(commitId, avatar.value) : undefined
    loading.value = false
  }, 
  { immediate:true })

  const hashStore = useHashStore();
</script>

<template>
  <div v-if="loading">
    <LoadingNav />
  </div>
  <template v-else-if="avatar && character">
    <header>
      <h1>
        <span class="pretitle">Auto AI:</span>
        {{ avatar.AvatarName.Text }}
      </h1>
    </header>
    <section>
      
      <template v-if="character?.AITagList">
        <h2>AI Tags</h2>
        {{ Object.keys(character.AITagList.Values).map(hash => hashStore.translate(parseInt(hash)) ?? hash).join(', ') }}
      </template>

      <template v-for="skill in character.SkillList">
        <template v-if="skill.ComplexSkillAIPreCheck || skill.ComplexSkillAI">
          <h2>{{ skill.Name }}</h2>

          <template v-if="skill.ComplexSkillAIPreCheck">
            <h3>Precheck Weights</h3>
            <ul>
              <li v-for="weightGroup in skill.ComplexSkillAIPreCheck?.Groups">
                {{ weightGroup.GroupName }} 
                {{ cleanupNumber(weightGroup.Weight?.Value ?? 1) }}
              </li>
            </ul>
            <span class="minor" v-if="skill.ComplexSkillAIPreCheck?.SkillBasicPower">
              Power: {{ cleanupNumber(skill.ComplexSkillAIPreCheck?.SkillBasicPower.Value) }}
            </span>
          </template>

          <template v-if="skill.ComplexSkillAI">
            <h3>Weights</h3>
            <ul>
              <li v-for="weightGroup in skill.ComplexSkillAI?.Groups">
                {{ weightGroup.GroupName }} 
                {{ cleanupNumber(weightGroup.Weight?.Value ?? 1) }}
              </li>
            </ul>
            <span class="minor" v-if="skill.ComplexSkillAI?.SkillBasicPower">
              Power: {{ cleanupNumber(skill.ComplexSkillAI?.SkillBasicPower.Value) }}
            </span>
          </template>

        </template>
      </template>

    </section>
  </template>
</template>