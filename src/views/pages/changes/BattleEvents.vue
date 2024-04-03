<script setup lang="ts">
  import { computed, ref, watch, } from 'vue';
  import { BattleEventConfig, getBattleEvents } from '@/sources/battleevent';
  import BattleEventItem from './BattleEventItem.vue';
  import LoadingArea from '@/components/LoadingArea.vue';

  const props = defineProps<{fromCommitId:string, commitId:string}>()

  const loading = ref(true)
  const battleEventsFrom = ref<BattleEventConfig>({} as BattleEventConfig)
  const battleEvents = ref<BattleEventConfig>({} as BattleEventConfig)
  watch(props, async () => 
  {
    loading.value = true
    battleEventsFrom.value = await getBattleEvents(props.fromCommitId)
    battleEvents.value = await getBattleEvents(props.commitId)
    loading.value = false
  }, { immediate:true })

  const addedBattleEvents = computed(() => Object.values(battleEvents.value)
    .filter(v => battleEventsFrom.value[v.BattleEventID] == undefined)
    .sort((a, b) => a.BattleEventName > b.BattleEventName ? 1 : -1))

  const removedBattleEvents = computed(() => Object.values(battleEventsFrom.value)
    .filter(v => battleEvents.value[v.BattleEventID] == undefined)
    .sort((a, b) => a.BattleEventName > b.BattleEventName ? 1 : -1))

</script>

<template>

  <h2>Battle Events</h2>

  <LoadingArea :loading="loading">
    <h3>{{ addedBattleEvents.length }} Added</h3>
    <template v-for="battleEvent in addedBattleEvents">
      <BattleEventItem :battleEvent="battleEvent" :isPrevious="false" />
    </template>

    <h3>{{ removedBattleEvents.length }} Removed</h3>
    <template v-for="battleEvent in removedBattleEvents">
      <BattleEventItem :battleEvent="battleEvent" :isPrevious="true" />
    </template>
  </LoadingArea>

</template>

<style scoped>
</style>