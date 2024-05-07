<script setup lang="ts">
  import { ref, watch, } from 'vue';
  import { TaskContextType, } from '@/sources/ability';
  import { retrieveModifierCompare, ModifierCompare } from '@/common/changes-modifier';
  import ModifierItem from './ModifierItem.vue';
  import LoadingArea from '@/components/LoadingArea.vue';

  const props = defineProps<{fromCommitId:string, commitId:string, contextType:TaskContextType}>()

  const loading = ref(true)
  const compare = ref<ModifierCompare>(await retrieveModifierCompare(props.fromCommitId, props.commitId, TaskContextType.Empty))
  watch(props, async () => 
  {
    loading.value = true
    compare.value = await retrieveModifierCompare(props.fromCommitId, props.commitId, props.contextType)
    loading.value = false
  }, { immediate:true })
</script>

<template>

  <h2>Modifiers</h2>

  <LoadingArea :loading="loading">
    <h3>{{ compare.Added.length }} Added</h3>
    <template v-for="modifier in compare.Added">
      <ModifierItem :modifier="modifier" :isPrevious="false" />
    </template>

    <h3>{{ compare.Changed.length }} Changed</h3>
    <template v-for="modifierPair in compare.Changed">
      <ModifierItem :modifier="modifierPair.To" :modifierFrom="modifierPair.From" :isPrevious="false" />
    </template>

    <h3>{{ compare.Removed.length }} Removed</h3>
    <template v-for="modifier in compare.Removed">
      <ModifierItem :modifier="modifier" :isPrevious="true" />
    </template>
  </LoadingArea>

</template>

<style scoped>
</style>