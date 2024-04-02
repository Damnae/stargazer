<script setup lang="ts">
  import { computed, ref, watch, } from 'vue';
  import { TaskContext, TaskContextType, getTaskContext } from '@/sources/ability';

  const props = defineProps<{fromCommitId:string, commitId:string, contextType:TaskContextType}>()

  const taskContextFrom = ref<TaskContext>(await getTaskContext(props.fromCommitId, props.contextType))
  const taskContext = ref<TaskContext>(await getTaskContext(props.commitId, props.contextType))
  watch(props, async () => 
  {
    const from = await getTaskContext(props.fromCommitId, props.contextType)
    const to = await getTaskContext(props.commitId, props.contextType)
    taskContextFrom.value = from
    taskContext.value = to
  })

  const addedAbilities = computed(() => Object.values(taskContext.value.Abilities)
      .filter(v => taskContextFrom.value.Abilities[v.Name] == undefined)
      .sort((a, b) => a.Name > b.Name ? 1 : -1))

  function createAbilityRoute(abilityId:string)
  { 
    return { name: 'ability', params: { commitId: props.commitId, abilityId: abilityId, }}
  }
  
  function createModifierRoute(modifierId:string)
  { 
    return { name: 'modifier', params: { commitId: props.commitId, modifierId: modifierId, }}
  }
</script>

<template>

  <h2>
    <span class="minor">{{ Object.keys(taskContext.Abilities).length - Object.keys(taskContextFrom.Abilities).length }}</span>
    Abilities
  </h2>
  <div class="block" v-for="addedAbility in addedAbilities">
    <RouterLink v-if="addedAbility.Name" :to="createAbilityRoute(addedAbility.Name)">
      <em>{{ addedAbility.Name }}</em>
    </RouterLink>
    <div class="block" v-for="modifier in addedAbility.Modifiers">
      <RouterLink v-if="modifier.Name" :to="createModifierRoute(modifier.Name)">
        <em>{{ modifier.Name }}</em>
      </RouterLink>
      <template v-if="modifier.BehaviorFlagList">
        &nbsp;<span class="minor">
          {{ modifier.BehaviorFlagList.join(', ') }}
        </span>
      </template>
    </div>
  </div>

</template>

<style scoped>
</style>