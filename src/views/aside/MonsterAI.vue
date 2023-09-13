<script setup lang="ts">
  import { ref, computed, watch, inject, } from 'vue';
  import { useRoute } from 'vue-router';
  import { cleanupTaskName } from '@/common/common';
  import { Monster, getMonster } from '@/sources/monster';
  import { CharacterAI, getCharacterAIByMonster } from '@/sources/characterai';

  import ProvideMonsterContext from '@/views/abilities/components/ProvideMonsterContext.vue';
  import LoadingNav from '@/components/LoadingNav.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';

  const route = useRoute()
  const objectId = computed(() => Number.parseInt(route.params.objectId as string, 10))

  const commitId = inject<string>('commitId') as string
  const monster = ref<Monster>()
  const characterAI = ref<CharacterAI>()

  const loading = ref(true)
  watch(objectId, async () => 
  {
    loading.value = true
    monster.value = await getMonster(commitId, objectId.value)
    characterAI.value = monster.value ? await getCharacterAIByMonster(commitId, monster.value) : undefined
    loading.value = false
  }, 
  { immediate:true })
</script>

<template>
  <div v-if="loading">
    <LoadingNav />
  </div>
  <template v-else-if="characterAI">
    <header>
      <h1>
        <span class="pretitle">AI:</span>
        {{ characterAI.AIName }}
      </h1>
    </header>
    <section>
      <ProvideMonsterContext :commitId="commitId" :objectId="objectId">

        <h2>Variables</h2>
        <div v-for="variable in characterAI.VariableList">
          <div>
            <span class="minor">{{ cleanupTaskName(variable.$type) }}</span> 
            {{ variable.Name }} = {{ variable.Value }}
          </div>
        </div>
      
        <h2>Decisions</h2>
        <div v-for="decision in characterAI.DecisionList">
          <h3>{{ decision.DecisionName }}</h3>
          
          <div v-for="axis in decision.ConsiderAxisList">
            <AnyTask :node="axis" />
          </div>

          <AnyTask :node="decision.RootTask" />
        </div>

      </ProvideMonsterContext>
    </section>
  </template>
</template>