<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getStatus, Status, } from '@/sources/status';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'
  import LoadingNav from '@/components/LoadingNav.vue';

  const props = defineProps<{commitId:string, objectId:number}>()

  const status = ref<Status>()

  const loading = ref(true)
  watchEffect(async () => 
  {
    loading.value = true
    status.value = await getStatus(props.commitId, props.objectId)
    loading.value = false
  })
</script>

<template>
  <div v-if="loading">
    <LoadingNav />
  </div>
  <div v-else-if="status" :key="objectId">
    <h1>{{ status.StatusName.Text }}</h1>
    <NavTree>
      <NavItem v-if="status.ModifierName">
        <NavTree :startsOpen="true">
          <template #header>Modifier</template>
          <NavItem>
            <RouterLink :to="{ name:'statusModifier', params:{ commitId: commitId, objectId: objectId, modifierId: status.ModifierName, }}">
              {{ status.ModifierName }}
            </RouterLink>
          </NavItem>
        </NavTree>
      </NavItem>
    </NavTree>
  </div>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>