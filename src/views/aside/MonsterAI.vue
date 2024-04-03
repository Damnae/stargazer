<script setup lang="ts">
  import { ref, computed, watch, inject, } from 'vue';
  import { useRoute } from 'vue-router';
  import { Monster, getMonster } from '@/sources/monster';
  import { Character, getCharacterByMonster } from '@/sources/character';
  import { CharacterAI, getCharacterAIByMonster } from '@/sources/characterai';
  import { MonsterSkill, getMonsterSkillsByIds } from '@/sources/monsterskill';

  import LoadingArea from '@/components/LoadingArea.vue';
  import ProvideMonsterContext from '@/views/abilities/components/ProvideMonsterContext.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const commitId = inject<string>('commitId') as string
  
  const route = useRoute()
  const objectId = computed(() => Number.parseInt(route.params.objectId as string, 10))

  const monster = ref<Monster>()
  const character = ref<Character>()
  const characterAI = ref<CharacterAI>()
  const skillSequence = ref<MonsterSkill[]>([])

  const loading = ref(true)
  watch(objectId, async () => 
  {
    loading.value = true
    monster.value = await getMonster(commitId, objectId.value)
    character.value = monster.value ? await getCharacterByMonster(commitId, monster.value) : undefined
    characterAI.value = monster.value ? await getCharacterAIByMonster(commitId, monster.value) : undefined
    skillSequence.value = await getSkillSequence(monster.value)
    loading.value = false
  }, 
  { immediate:true })

  async function getSkillSequence(monster?:Monster)
  {    
    if (!monster)
      return []
    const skillIds = getSkillSequenceIds(monster)
    if (!skillIds)
      return []
    return getMonsterSkillsByIds(commitId, skillIds.map(s => s.Value))
  }
  
  function getSkillSequenceIds(monster?:Monster)
  {    
    if (monster?.OverrideAISkillSequence && monster.OverrideAISkillSequence.length > 0)
      return monster.OverrideAISkillSequence
    if (monster?.MonsterTemplate?.AISkillSequence)
      return monster.MonsterTemplate.AISkillSequence
    return undefined
  }
</script>

<template>
  <LoadingArea :loading="loading">
    <template v-if="characterAI">
      <header>
        <h1>
          <span class="pretitle">AI:</span>
          {{ characterAI.AIName }}
        </h1>
      </header>
      <section>
        <ProvideMonsterContext :commitId="commitId" :objectId="objectId">

          <h2>Variables</h2>
          <div>
            <div v-if="monster" v-for="variable in monster.CustomValues">
              {{ variable.Property }} = {{ variable.Value }}
            </div>
            <div v-if="character" v-for="name, value in character.CustomValues">
              {{ value }} = {{ name }}
            </div>
            <div v-for="variable in characterAI.VariableList">
              {{ variable.Name }} = {{ variable.Value }}
            </div>
          </div>
        
          <h2>Decisions</h2>
          <div v-for="decision in characterAI.DecisionList">
            <AnyTask :node="decision" />
          </div>

          <template v-if="skillSequence.length > 0">
            <h2>Skill Sequence</h2>
            <ul>
              <li v-for="skill in skillSequence">
                {{ skill.SkillTriggerKey }}
                <span class="minor">{{ skill.SkillName.Text }}</span>
              </li>
            </ul>
          </template>

        </ProvideMonsterContext>
      </section>
    </template>
  </LoadingArea>
</template>