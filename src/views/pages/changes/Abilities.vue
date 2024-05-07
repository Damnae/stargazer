<script setup lang="ts">
  import { ref, watch, } from 'vue';
  import { TaskContextType, } from '@/sources/ability';
  import { retrieveAbilityCompare, AbilityCompare } from '@/common/changes-ability';
  import AbilityItem from './AbilityItem.vue';
  import LoadingArea from '@/components/LoadingArea.vue';

  const props = defineProps<{fromCommitId:string, commitId:string, contextType:TaskContextType}>()

  const loading = ref(true)
  const compare = ref<AbilityCompare>(await retrieveAbilityCompare(props.fromCommitId, props.commitId, TaskContextType.Empty))
  watch(props, async () => 
  {
    loading.value = true
    compare.value = await retrieveAbilityCompare(props.fromCommitId, props.commitId, props.contextType)
    loading.value = false
  }, { immediate:true })
</script>

<template>

  <h2>Abilities</h2>

  <LoadingArea :loading="loading">
    <h3>{{ compare.Added.length }} Added</h3>
    <template v-for="ability in compare.Added">
      <AbilityItem :ability="ability" :isPrevious="false" />
    </template>

    <h3>{{ compare.Changed.length }} Changed</h3>
    <template v-for="abilityPair in compare.Changed">
      <AbilityItem :ability="abilityPair.To" :abilityFrom="abilityPair.From" :isPrevious="false" />
    </template>

    <h3>{{ compare.Removed.length }} Removed</h3>
    <template v-for="ability in compare.Removed">
      <AbilityItem :ability="ability" :isPrevious="true" />
    </template>
  </LoadingArea>

</template>

<style scoped>
</style>